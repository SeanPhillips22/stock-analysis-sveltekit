<script lang="ts" context="module">
	import NewsFeed from '$lib/components/News/_NewsFeed.svelte'
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('https://api.stockanalysis.com/wp-json/sa/news?type=stocks')
		const initialData = await res.json()

		return {
			props: { initialData }
		}
	}
</script>

<script lang="ts">
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'
	import NewsWidget from '$lib/components/News/NewsWidget.svelte'
	import type { NewsArray } from '$lib/components/News/types'

	export let initialData: { data: NewsArray; other: NewsArray }
	$: news = initialData.data
	$: other = initialData.other
</script>

<svelte:head>
	<title>All Stock News</title>
	<meta
		name="description"
		content="The latest news on individual stocks on the US stock market, gathered from trusted finance and investing websites."
	/>
	<link rel="canonical" href="https://stockanalysis.com/news/all-stocks/" />
</svelte:head>

<main class="contain">
	<h1>All Stock News</h1>

	<nav>
		<ul class="navmenu">
			<li><a href="/news/" sveltekit:prefetch>Markets</a></li>
			<li><a href="/news/all-stocks/" class="active">All Stocks</a></li>
			<li><a href="/news/press-releases" sveltekit:prefetch>Press Releases</a></li>
		</ul>
	</nav>

	<div class="body-wrap">
		<NewsFeed {news} related="Stocks" />
		<aside>
			<Sidebar1 />
			<NewsWidget
				title="Press Releases"
				news={other}
				button={{ href: '/news/press-releases/', title: 'All Press Releases' }}
			/>
		</aside>
	</div>
</main>

<style>
	nav {
		@apply mb-0.5 border-b-[3px] border-blue-brand_sharp;
	}

	.body-wrap {
		@apply lg:grid lg:grid-cols-sidebar lg:gap-x-10;
	}

	aside:global {
		@apply flex flex-col space-y-7 py-6 lg:space-y-10;
	}
</style>
