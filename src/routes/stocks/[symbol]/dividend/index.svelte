<script lang="ts">
	/**
	 * Dividend pages for stocks
	 *
	 * TODO add charts
	 */
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'

	import InfoBox from '$lib/components/Alerts/InfoBox.svelte'
	import NewsWidget from '$lib/components/News/NewsWidget.svelte'
	import type { NewsMinimal } from '$lib/components/News/types'
	import HistoryTable from '$lib/components/Pages/Dividend/HistoryTable.svelte'
	import InfoTable from '$lib/components/Pages/Dividend/InfoTable.svelte'

	import StockLayout from '$lib/components/StockLayout.svelte'

	import type { Info } from '$lib/types/Info'

	export let data: any
	export let info: Info
	export let news: NewsMinimal[]

	let title = info.name.length < 12 ? info.name : info.ticker
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Dividend History, Dates & Yield</title>
	<meta
		name="description"
		content="Get the latest dividend data for {info.nameFull} ({info.ticker}), including dividend history, yield, key dates, growth and other metrics."
	/>
	<link rel="canonical" href="https://stockanalysis.com/stocks/{info.symbol}/dividend/" />
</svelte:head>

<StockLayout state={{ info, data }}>
	<div class="wrap">
		<div>
			<h2>{title} Dividend Information</h2>

			{#if data.infoBox}
				<div class="info-box">
					<InfoBox text={data.infoBox} />
				</div>
			{/if}

			<InfoTable />

			{#if data.history.length}
				<HistoryTable disclaimer={true} />
			{/if}
		</div>

		<aside>
			{#if data.history.length > 0}
				<Sidebar1 />
			{/if}
			<NewsWidget
				title={`${info.ticker} News`}
				{news}
				button={{
					title: 'More News',
					href: `/stocks/${info.symbol}/`
				}}
			/>
		</aside>
	</div>
</StockLayout>

<style type="text/postcss">
	.wrap {
		@apply lg:grid lg:grid-cols-sidebar gap-8 mt-3 sm:mt-4 py-1;
	}

	h2 {
		@apply text-xl font-bold bp:text-2xl;
	}

	.info-box {
		@apply mt-4 mb-2 lg:mb-3;
	}

	aside:global {
		@apply mt-7 space-y-8 lg:mt-0;
	}
</style>
