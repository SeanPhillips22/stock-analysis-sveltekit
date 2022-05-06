<script lang="ts">
	/**
	 * Container for the news feed on stock overview pages. Has a news menu
	 * above the news feed with buttons and search functionality.
	 */
	import { info } from '$lib/stores/infoStore'
	import NewsFeed from '$lib/components/News/_NewsFeed.svelte'
	import NewsMenu from './NewsMenu.svelte'

	import { loadStockTwits } from '$lib/components/News/loadStockTwits'

	import type { NewsArray } from '$lib/components/News/types'
	import { user } from '$lib/auth/userStore'
	import Paywall from './Paywall.svelte'
	import Information from '$lib/components/Alerts/Information.svelte'

	export let news: NewsArray
	export let updated: number

	let active = 'all' // The active news menu item
	let search = '' // The search string
	let searching = false // Set as true while performing news search
	let dataPage = 2 // Use with the load more button
	let error: string | undefined = undefined // Display a message if unable to fetch news

	let failed: string | undefined = undefined // Display this as an error message if fetching fails
	let fetchedNews: NewsArray | undefined
	async function fetchNews(type: 'alternative' | 'fresh' | 'infinite' | 'search', append?: string) {
		let url = `https://api.stockanalysis.com/wp-json/sa/news?s=${$info.symbol}&t=${$info.type}`
		switch (type) {
			// Fetch news videos or press releases
			case 'alternative':
				url = `https://api.stockanalysis.com/wp-json/sa/news?s=${$info.symbol}&t=${$info.type}`
				failed =
					append === 'v' ? 'No videos found for this stock.' : 'No additional press releases found for this stock.'
				break

			// Check for fresh news if more than one hour since news check
			case 'fresh':
				url = `https://api.stockanalysis.com/wp-json/sa/news-fresh?s=${$info.symbol}&t=${$info.type}`
				break

			// Fetch more news after clicking "Load More"
			case 'infinite':
				// If currently showing 25 items, fetch the other 25 (stored is 50)
				// Else, do a paginated search
				if (displayNews.length === 25) {
					url = `https://api.stockanalysis.com/wp-json/sa/news?s=${$info.symbol}&t=${$info.type}&full=true`
				} else if (displayNews.length >= 50 && $user?.isPro) {
					url = `https://api.stockanalysis.com/wp-json/sa/news-infinite?s=${$info.symbol}&t=${$info.type}&p=${dataPage}`
					url += '&k=' + import.meta.env.VITE_PUBLIC_PRO_KEY
					dataPage = dataPage + 1
				}
				failed = 'No more news found.'
				break

			// Fetch news search results
			case 'search':
				searching = true
				url = `https://api.stockanalysis.com/wp-json/sa/news-search?s=${$info.symbol}&t=${$info.type}&q=${search}`
				failed = 'No news found for that search query.'
				break
		}

		if (append === 'v' || append === 'pr') url += `&f=${append}`

		const res = await fetch(url)
		const data = await res.json()

		// If fetching fresh news, only update the prop if the latest item is different
		if (data.data?.length || data.length) {
			if (type !== 'fresh' || data[0].title !== news[0].title) {
				fetchedNews = data.data || data
			}
		} else if (failed) {
			error = failed
		}

		// If searching was set as true, make it false again
		if (searching) searching = false
	}

	// Reset the news menu state
	function reset() {
		active = 'all'
		fetchedNews = undefined
		error = undefined
		dataPage = 2
	}

	// 1. When clicking on a news menu item, change the content
	// 2. Check if there is more than one hour since the updated timestamp
	// and if so, load fresh news
	$: {
		if (active === 'v' || active === 'pr') {
			fetchNews('alternative', active)
		} else if (active === 'chat') {
			setTimeout(() => {
				loadStockTwits($info.symbol)
			}, 50)
		} else if (updated && updated * 1000 < Date.now() - 60 * 60 * 1000) {
			fetchNews('fresh')
		}
	}

	// If alternative news is selected, show it
	// else, show the default news
	$: displayNews = fetchedNews || news
	$: paywalled = displayNews.length === 50 && !$user?.isPro
</script>

{#if news && news.length}
	<div class="news-wrap">
		<h2>News</h2>
		<NewsMenu
			bind:active
			bind:search
			on:resetNews={() => reset()}
			on:searchNews={() => fetchNews('search', active)}
			{searching}
		/>
		{#if active === 'chat'}
			<div id="altwrap" class="overflow-x-auto pt-2" />
		{:else}
			{#if error}
				<Information message={error} />
			{/if}
			<NewsFeed news={displayNews} related="Other symbols" {paywalled} />
			<!-- Only add "Load More" button if results are limited -->
			{#if displayNews.length >= 25}
				{#if paywalled}
					<Paywall />
				{:else}
					<button on:click={() => fetchNews('infinite', active)}>Load More News</button>
				{/if}
			{/if}
		{/if}
	</div>
{:else}
	<div class="no-news">
		<h2>News</h2>
		<span>There is no news available yet.</span>
	</div>
{/if}

<style type="text/postcss">
	.news-wrap {
		@apply mt-6 lg:mt-0;
	}

	h2 {
		@apply mb-0;
	}

	.no-news {
		@apply mt-6 lg:mt-0;
	}

	.no-news h2 {
		@apply mb-2;
	}

	.no-news span {
		@apply text-xl;
	}

	button {
		@apply mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-lg font-semibold rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-brand_light text-white hover:bg-blue-brand_sharp whitespace-nowrap;
		background-color: #3c74d4;
	}
</style>
