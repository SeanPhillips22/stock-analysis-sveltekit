<script lang="ts" context="module">
	import NewsFeed from '$lib/components/News/_NewsFeed.svelte'
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('https://api.stockanalysis.com/wp-json/sa/news?type=market')
		const data = await res.json()

		return {
			props: { data }
		}
	}
</script>

<script lang="ts">
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'
	import NewsWidget from '$lib/components/News/NewsWidget.svelte'
	import type { NewsArray, NewsMinimal } from '$lib/components/News/types'

	export let data: { data: NewsArray; other: NewsMinimal[] }
</script>

<svelte:head>
	<title>Today's Stock Market News and Breaking Stories</title>
	<meta
		name="description"
		content="Get the latest stock market news and breaking stories from the world's best finance and investing websites."
	/>
	<link rel="canonical" href="https://stockanalysis.com/news/" />
</svelte:head>

<main class="contain">
	<h1>Stock Market News</h1>

	<nav>
		<ul class="navmenu">
			<li><a href="/news/" class="active">Markets</a></li>
			<li><a href="/news/all-stocks/" sveltekit:prefetch>All Stocks</a></li>
			<li><a href="/news/press-releases" sveltekit:prefetch>Press Releases</a></li>
		</ul>
	</nav>

	<div class="body-wrap">
		<NewsFeed news={data.data} />
		<aside>
			<Sidebar1 />
			<NewsWidget title="Stock News" news={data.other} button={{ href: '/news/', title: 'All Stock News News' }} />
		</aside>
	</div>
</main>

<style type="text/postcss">
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
