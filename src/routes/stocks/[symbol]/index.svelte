<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ params, fetch, stuff }) => {
		let symbol = params.symbol

		const res = await fetch(`https://api.stockanalysis.com/wp-json/sa/overview?symbol=${symbol}&t=stocks`)
		const data = await res.json()

		return {
			props: { stuff, initialData: data.data }
		}
	}
</script>

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

	export let stuff: { info: Info }
	export let initialData: { data: Overview; news: NewsObject }

	$: info = stuff.info // from layout
	$: data = initialData.data
	$: news = initialData.news.data
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Stock Price, Quote & News</title>
</svelte:head>

<div class="overview">
	<PriceChart {info} />
	<div class="top-tables">
		<InfoTable {data} />
		<QuoteTable {info} {data} />
	</div>
</div>

<div class="details-news-wrap">
	<div class="details-wrap">
		{#if news.length > 5}
			<Sidebar1All />
		{/if}
		<ProfileWidget {info} {data} />
		{#if data.financialChart}
			<FinancialsWidget {info} {data} />
		{/if}
		{#if data.analystChart}
			<AnalystWidget {info} {data} />
		{/if}
	</div>
	<div class="news-wrap">
		<!-- updated={newsObject.updated} -->
		<NewsArea {news} />
	</div>
</div>

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
		@apply space-y-6 px-4 md:px-0 lg:order-2 lg:pt-1;
	}

	.news-wrap {
		@apply lg:order-1;
	}
</style>
