<script lang="ts">
	/**
	 * The analyst rating and price target widget shown on the stock overview pages
	 * Has a text snippet and a chart.
	 */
	import type { Info } from '$lib/types/Info'
	import type { Overview } from '$lib/types/OverviewPageData'
	import Button from '$lib/components/Buttons/Button.svelte'
	import AnalystWidgetChart from './AnalystWidgetChart.svelte'

	export let info: Info
	export let data: Overview

	let targetColor: string = 'text-gray-800'
	let consensusColor: string = 'text-gray-800'

	$: priceTarget = data.analystTarget[0]
	$: difference = data.analystTarget[1]
	$: updown = data.analystTarget[2]

	$: if (updown === 'upside') {
		targetColor = 'text-green-700'
		consensusColor = 'text-green-800'
	} else if (updown === 'downside') {
		targetColor = consensusColor = 'text-red-600'
	}
</script>

{#if data.analystTarget && data.analysts !== 'n/a'}
	<div>
		<h2 class="mb-2">Analyst Forecast</h2>
		{#if data.analystIntro}
			<p class="mb-4">{data.analystIntro}</p>
		{/if}

		<div class="wrap">
			<div class="target-title">Price Target</div>
			<div class="target {targetColor}">{priceTarget}</div>
			{#if ['upside', 'downside'].includes(updown)}
				<div class="difference">({difference} {updown})</div>
			{/if}

			<div class="consensus">
				Analyst Consensus: <span class="font-bold {consensusColor}">{data.analysts}</span>
			</div>

			{#key info.symbol}
				<AnalystWidgetChart ratings={data.analystChart} />
			{/key}
		</div>

		{#if !info.exceptions.hideForecast}
			<Button href={`/stocks/${info.symbol}/forecast/`} title="Stock Forecasts" classes="w-full mt-4" />
		{/if}
	</div>
{/if}

<style type="text/postcss">
	.wrap {
		@apply border border-gray-200 p-2 xs:p-3;
	}

	.target-title {
		@apply m-auto mb-2 text-center text-xl font-semibold text-gray-900;
	}

	.target {
		@apply mb-0.5 text-center text-4xl font-semibold;
	}

	.difference {
		@apply mb-1.5 text-center text-xl;
	}

	.consensus {
		@apply py-1 text-center text-lg font-semibold text-gray-900;
	}
</style>
