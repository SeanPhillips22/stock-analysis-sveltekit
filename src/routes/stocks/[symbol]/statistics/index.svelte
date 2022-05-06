<script lang="ts">
	import { setContext } from 'svelte'
	import StockLayout from '$lib/components/StockLayout.svelte'
	import StatsWidget from '$lib/components/Pages/Statistics/StatsWidget.svelte'

	import { MAP_STATISTICS } from '$lib/components/Pages/Statistics/MAP_STATISTICS'
	import type { Info } from '$lib/types/Info'
	import Button from '$lib/components/Buttons/Button.svelte'

	export let info: Info
	export let data: any

	setContext('statistics_map', MAP_STATISTICS)
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Statistics & Valuation Metrics</title>
	<meta
		name="description"
		content="Detailed statistics for {info.nameFull} ({info.ticker}) stock, including valuation metrics, financial numbers, share information and more."
	/>
	<link rel="canonical" href="https://stockanalysis.com/stocks/{info.symbol}/statistics/" />
</svelte:head>

<StockLayout state={{ info, data }}>
	<div class="wrap">
		<div class="column">
			<div><StatsWidget title="Total Valuation" key="valuation" /></div>
			<div><StatsWidget title="Important Dates" key="dates" /></div>
			<div><StatsWidget title="Share Statistics" key="shares" /></div>
			<div>
				<StatsWidget title="Valuation Ratios" key="ratios" />
				<Button href="/stocks/{info.symbol}/financials/ratios/" title="Financial Ratio History" classes="mt-4" />
			</div>
			<div><StatsWidget title="Enterprise Valuation" key="evratios" /></div>
			<div><StatsWidget title="Financial Position" key="financialPosition" /></div>
			<div><StatsWidget title="Financial Efficiency" key="financialEfficiency" /></div>
			<div><StatsWidget title="Taxes" key="taxes" /></div>
		</div>
		<div class="column">
			<div><StatsWidget title="Stock Price Statistics" key="stockprice" /></div>
			<div><StatsWidget title="Short Selling Information" key="short" /></div>
			<div>
				<StatsWidget title="Income Statement" key="income" />
				<Button href="/stocks/{info.symbol}/financials/" title="Full Income Statement" classes="mt-4" />
			</div>
			<div>
				<StatsWidget title="Balance Sheet" key="balance" />
				<Button href="/stocks/{info.symbol}/financials/balance-sheet/" title="Full Balance Sheet" classes="mt-4" />
			</div>
			<div>
				<StatsWidget title="Cash Flow" key="cashflow" />
				<Button
					href="/stocks/{info.symbol}/financials/cash-flow-statement/"
					title="Full Cash Flow Statement"
					classes="mt-4"
				/>
			</div>
			<div><StatsWidget title="Margins" key="margins" /></div>
		</div>
		<div class="column">
			<div>
				<StatsWidget title="Dividends & Yields" key="dividends" />
				<Button href="/stocks/{info.symbol}/dividend/" title="Dividend Details" classes="mt-4" />
			</div>
			<div>
				<StatsWidget title="Analyst Forecast" key="forecast" />
				{#if !info.exceptions.hideForecast}
					<Button href="/stocks/{info.symbol}/forecast/" title="Stock Forecasts" classes="mt-4" />
				{/if}
			</div>
			<div><StatsWidget title="Stock Splits" key="splits" /></div>
		</div>
	</div>
</StockLayout>

<style type="text/postcss">
	.wrap {
		@apply space-y-5 mt-5 xs:mt-6 xs:space-y-6 lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0;
	}

	.column {
		@apply flex flex-col gap-y-5 xs:gap-y-6 lg:gap-y-8;
	}
</style>
