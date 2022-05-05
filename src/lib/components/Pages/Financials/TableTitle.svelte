<script lang="ts">
	import { state } from '$lib/stores/financialsStore'
	import { capitalize } from '$lib/functions/utils/capitalize'

	import type { Info } from '$lib/types/Info'
	import type { Range, Statement } from './types'
	import ChevronUp from '$lib/icons/ChevronUp.svelte'
	import ChevronDown from '$lib/icons/ChevronDown.svelte'

	export let info: Info
	export let title: string
	export let range: Range
	export let statement: Statement

	const dividerText = 'millions'
	const dividerTextDesktop = dividerText ? dividerText + ' ' : ''
	const dividerTextMobile = dividerText ? capitalize(dividerText) + ' ' : ''
	const firstWord = statement === 'ratios' ? 'Market cap' : 'Financials'
	const currency = statement === 'ratios' ? 'USD' : info.currency
</script>

<div>
	<h2>{title} ({capitalize(range) || 'Annual'})</h2>

	<div class="info">
		<div class="info-long">
			{`${firstWord} in ${dividerTextDesktop}${currency}. Fiscal year is ${info.fiscalYear}.`}
		</div>
		<div class="info-short">
			{`${dividerTextMobile}${currency}. Fiscal year is ${info.fiscalYearShort}.`}
		</div>

		<button class="text-gray-600 md:hidden" on:click={() => ($state.showOnMobile = !$state.showOnMobile)}>
			{#if $state.showOnMobile}
				<ChevronUp classes="h-6 w-6" />
			{:else}
				<ChevronDown classes="h-6 w-6" />
			{/if}
		</button>
	</div>
</div>

<style>
	h2 {
		@apply mb-1 text-[1.3rem] font-bold bp:text-2xl md:mb-3;
	}

	.info {
		@apply mb-1.5 flex items-end justify-between md:block lg:mb-0;
	}

	.info-long {
		@apply hidden pb-1 text-sm text-gray-600 lg:block;
	}

	.info-short {
		@apply block text-sm text-gray-600 lg:hidden;
	}
</style>
