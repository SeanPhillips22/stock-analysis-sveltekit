<script lang="ts">
	import PriceChart from '$lib/components/Pages/Overview/PriceChart/_PriceChart.svelte'
	import InfoTable from '$lib/components/Pages/Overview/TopTables/Stocks/TopTableInfo.svelte'
	import QuoteTable from '$lib/components/Pages/Overview/TopTables/Stocks/TopTableQuote.svelte'
	import FinancialsWidget from '$lib/components/Pages/Overview/FinancialsWidget/_FinancialsWidget.svelte'
	import NewsArea from '$lib/components/Pages/Overview/NewsArea/_NewsArea.svelte'
	import Sidebar1All from '$lib/components/Ads/AdSense/Sidebar1All.svelte'

	import type { Overview } from '$lib/types/OverviewPageData'
	import type { Info } from '$lib/types/Info'
	import type { NewsObject } from '$lib/components/News/types'
	import ProfileWidget from '$lib/components/Pages/Overview/ProfileWidget.svelte'
	import AnalystWidget from '$lib/components/Pages/Overview/AnalystWidget/AnalystWidget.svelte'
	import StockLayout from '$lib/components/StockLayout.svelte'

	export let info: Info
	export let data: Overview
	export let news: NewsObject

	// The meta description
	let description = `Get a real-time ${info.nameFull} (${info.ticker}) stock price quote with breaking news, financials, statistics, charts and more.`
	if (info.state == 'upcomingipo') {
		description = `Get the latest ${info.nameFull} (${info.ticker}) stock price quote with news, financials, IPO details and other important investing information.`
	} else if (info.archived) {
		description = `Get the latest ${info.nameFull} (${info.ticker}) stock price quote with news, financials and other important investing information.`
	}
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Stock Price, Quote & News</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://stockanalysis.com/stocks/{info.symbol}/" />
</svelte:head>

<StockLayout state={{ info, data }}>
	<div class="overview">
		<PriceChart />
		<div class="top-tables">
			<InfoTable />
			<QuoteTable />
		</div>
	</div>

	<div class="details-news-wrap">
		<div class="details-wrap">
			{#if news.data.length > 5}
				<Sidebar1All />
			{/if}
			<ProfileWidget />
			{#if data.financialChart}
				<FinancialsWidget />
			{/if}
			{#if data.analystChart}
				<AnalystWidget {data} />
			{/if}
		</div>
		{#key info.symbol}
			<div class="news-wrap">
				<NewsArea news={news.data} updated={news.updated} />
			</div>
		{/key}
	</div>
</StockLayout>

<style type="text/postcss">
	.overview {
		@apply mt-4 flex-row gap-4 lg:flex;
	}

	.top-tables {
		@apply order-1 flex flex-row gap-4;
	}

	.details-news-wrap {
		@apply mt-6 lg:grid lg:grid-cols-sidebar_wide lg:gap-x-10;
	}

	.details-wrap:global {
		@apply space-y-6 lg:order-2 lg:pt-1;
	}

	.news-wrap {
		@apply lg:order-1;
	}
</style>
