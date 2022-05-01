<!-- TODO - Also calculate the price change when dates other than 1D are selected -->
<script lang="ts">
	/**
	 * Display the price change during the selected chart period
	 */
	import type { Info } from '$lib/types/Info'
	import type { Time } from './types'

	export let info: Info
	export let chartTime: Time

	let change = info.quote.cp
	let css = change
		? Number(change) > 0
			? 'text-green-700'
			: Number(change) < 0
			? 'text-red-600'
			: 'text-gray-600'
		: 'text-gray-600'
</script>

<div class="price-change">
	<span class={css}>{change}%</span>
	<span class="hidden text-gray-700 sm:block">({chartTime})</span>
</div>

<style type="text/postcss">
	.price-change {
		@apply flex flex-row space-x-1 pr-1 text-smaller sm:text-base shrink;
	}
</style>
