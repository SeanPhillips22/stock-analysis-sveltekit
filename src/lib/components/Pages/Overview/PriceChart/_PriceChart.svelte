<script lang="ts">
	import { browser } from '$app/env'
	import { fade } from 'svelte/transition'
	import { info } from '$lib/stores/infoStore'

	import { fetchChartData } from './PriceChart.functions'
	import Controls from './PriceChartControls.svelte'
	import Change from './PriceChartChange.svelte'
	import Chart from './PriceChartChart.svelte'
	import Unavailable from './Unavailable.svelte'
	import LargeSpinner from '$lib/components/Loading/LargeSpinner.svelte'

	import type { Time, ChartData } from './types'

	let chartTime: Time = '1D'
	let chartData: ChartData
	let fetching = false

	async function fetchData(time: Time, symbol: string) {
		if ($info.state === 'upcomingipo') return

		fetching = true
		chartData = await fetchChartData($info.symbol, $info.type, time)
		fetching = false
	}

	// Fetch new chart data if chartTime changes
	$: fetchData(chartTime, $info.symbol)
</script>

{#if $info.state === 'upcomingipo'}
	<Unavailable borders={true} />
{:else}
	<div class="container">
		<div class="controls">
			<Controls bind:time={chartTime} />
			<Change {chartTime} {chartData} {fetching} />
		</div>
		<div class="chart-wrap">
			{#if fetching}
				<div class="spinner" in:fade={{ delay: 200, duration: 1500 }}>
					<LargeSpinner />
				</div>
			{:else if browser && chartData}
				<Chart {chartData} time={chartTime} />
			{:else if browser && !chartData?.length}
				<div class="h-full flex">
					<Unavailable title="No data available" description="We did not receive valid data from our data providers" />
				</div>
			{/if}
		</div>
	</div>
{/if}

<style type="text/postcss">
	.container {
		@apply order-3 grow overflow-hidden mb-4 border-t border-b border-gray-200 py-0.5 xs:py-1 sm:py-3 sm:px-2 lg:mb-0 lg:border-0 lg:border-l lg:border-gray-300 lg:py-0 lg:px-0 lg:pl-3;
	}

	.controls {
		@apply flex items-center justify-between py-1 sm:pt-0.5;
	}

	.chart-wrap {
		@apply h-[250px] sm:h-[300px];
	}

	.spinner {
		@apply overflow-y-hidden bg-gray-50 h-full flex;
	}
</style>
