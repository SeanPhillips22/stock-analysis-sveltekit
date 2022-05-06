<script lang="ts">
	/**
	 * Display the price change during the selected chart period.
	 * Calculate the change and decide which color to show.
	 */
	import { quote } from '$lib/stores/quoteStore'
	import { info } from '$lib/stores/infoStore'
	import { format } from '$lib/components/Tables/formatCell'

	import type { ChartData, Time } from './types'

	export let chartTime: Time
	export let chartData: ChartData
	export let fetching: boolean

	let raw: number
	let change: string | number = ''
	let css: string

	// Decide which color class to use based on the change
	function setColor(change: number) {
		if (change > 0) return 'up'
		if (change < 0) return 'down'
		else return 'flat'
	}

	$: if (chartTime === '1D') {
		raw = Number($quote.cp || $info.quote.cp)
		change = $quote.cp || $info.quote.cp
		css = setColor(raw)
	} else {
		let first = chartData[0].o
		let last = $quote.ep || $quote.p || $info.quote.ep || $info.quote.p

		if (first && last) {
			raw = (last / first - 1) * 100
			change = format(raw, 2)
			css = setColor(raw)
		}
	}
</script>

{#if !fetching}
	<div class="price-change">
		<span class={css}>{change}%</span>
		<span class="hidden text-gray-700 sm:block">({chartTime})</span>
	</div>
{/if}

<style type="text/postcss">
	.price-change {
		@apply flex flex-row space-x-1 pr-1 text-smaller sm:text-base shrink;
	}

	.up {
		@apply text-green-700;
	}

	.up::before {
		content: '+';
	}

	.down {
		@apply text-red-700;
	}

	.flat {
		@apply text-gray-600;
	}
</style>
