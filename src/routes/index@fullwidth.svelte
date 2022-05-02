<script lang="ts">
	import Movers from '$lib/components/Pages/HomePage/Movers/_Movers.svelte'
	import HomePageSearch from '$lib/components/Search/HomePageSearch.svelte'
	import News from '$lib/components/Pages/HomePage/News.svelte'
	import IPOwidgets from '$lib/components/Pages/HomePage/IPOwidgets.svelte'

	type Data = {
		date: string
		marketStatus: string
		trending: { s: string; n: string; t: string }[]
		gainers: { symbol: string; name: string; price: string; change: string }[]
		losers: { symbol: string; name: string; price: string; change: string }[]
		news: { t: string; u: string; n: string; d: string }[]
		recentIpos: { date: string; symbol: string; name: string }[]
		ipoCalendar: { date: string; symbol: string; name: string }[]
	}

	export let data: Data
	let { date, marketStatus, trending, gainers, losers, news, recentIpos, ipoCalendar } = data
</script>

<svelte:head>
	<title>Stock Analysis | Free Online Stock Information for Investors</title>
	<meta
		name="description"
		content="Stock Analysis has everything you need to analyze stocks, including detailed financial data, statistics, news and charts."
	/>
	<link rel="canonical" href="https://stockanalysis.com/" />
</svelte:head>

<div class="hero">
	<div class="inner">
		<h1>Search for a stock to start your analysis</h1>

		<p class="tagline">
			Accurate information on 6000+ stocks, including all the companies in the S&P500 index. See stock prices, news,
			financials, forecasts, charts and more.
		</p>

		<HomePageSearch />

		{#if trending.length === 4}
			<div class="trending">
				Trending:
				<a sveltekit:prefetch href="/stocks/{trending[0].s.toLowerCase()}/">{trending[0].s.toUpperCase()}</a>,
				<a sveltekit:prefetch href="/stocks/{trending[1].s.toLowerCase()}/">{trending[1].s.toUpperCase()}</a>,
				<a sveltekit:prefetch href="/stocks/{trending[2].s.toLowerCase()}/">{trending[2].s.toUpperCase()}</a>,
				<a sveltekit:prefetch href="/stocks/{trending[3].s.toLowerCase()}/">{trending[3].s.toUpperCase()}</a>
			</div>
		{/if}
	</div>
</div>

<div class="home-widgets">
	<Movers {date} {marketStatus} {gainers} {losers} />
	<div class="two-col">
		<News {news} />
		<IPOwidgets recent={recentIpos} upcoming={ipoCalendar} />
	</div>
</div>

<style type="text/postcss">
	.hero {
		@apply bg-gray-100 border-b border-gray-200 px-4 pb-12 pt-20 shadow-sm md:pt-32 md:pb-24 lg:pt-44 lg:pb-40 landscape:border-t-2 landscape:md:border-t-0;
	}

	.inner {
		@apply mx-auto max-w-[850px] text-center;
	}

	h1 {
		@apply mb-3 text-2xl font-bold xs:text-3xl sm:mb-5 md:text-4xl lg:mb-7 lg:text-[42px];
	}

	.tagline {
		@apply mb-4 text-base sm:text-lg md:mb-5 md:text-xl lg:mb-7 lg:text-[22px];
	}

	.trending {
		@apply text-sm xs:text-base md:text-lg lg:text-[19px];
	}

	.home-widgets {
		@apply pt-6 pb-3 md:pt-8 lg:pt-10;
	}

	.two-col {
		@apply mx-auto flex flex-col pt-6 md:pt-8 lg:pt-10 lg:grid lg:max-w-[1200px] lg:grid-cols-3 lg:justify-evenly lg:gap-8 first-line:lg:px-5;
	}
</style>
