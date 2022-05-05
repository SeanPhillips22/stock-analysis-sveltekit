<script lang="ts">
	import { state } from '$lib/stores/financialsStore'
	import Popover from '$lib/components/Popover/_Popover.svelte'
	import Tooltip from './Tooltip.svelte'
	import HoverCharts from './HoverCharts/ChartContainer.svelte'
	import BodyCell from './Paywall/BodyCell.svelte'
	import { formatCell } from './functions'

	import type { FinancialsMap, Range } from './types'
	import type { Info } from '$lib/types/Info'

	export let dates: string[]
	export let data: number[]
	export let row: FinancialsMap
	export let info: Info
	export let range: Range
	export let paywalled: boolean
	export let count: number

	// Reverse order of leftToRight is set
	$: displayData = $state.leftToRight ? [...data].reverse() : [...data]

	// Count how many valid items in order to skip rows with only zeros
	let valid = data?.filter((d) => d !== null && d !== 0)

	const dividers = {
		Billions: 1000000000,
		Millions: 1000000,
		Thousands: 1000,
		Raw: 1
	}
</script>

{#if displayData && valid && valid.length}
	<tr class={row.class}>
		<td>
			<Popover>
				<Tooltip slot="content" {row} />
				{row.title}
			</Popover>
			<HoverCharts {dates} {data} {range} {info} name={row.title} />
		</td>
		{#each displayData as point}
			{#if row.format === 'growth' || row.format === 'inverted-growth'}
				<td>{@html formatCell(row.format, point, dividers[$state.divider])}</td>
			{:else}
				{#key $state.divider}
					<td>{formatCell(row.format, point, dividers[$state.divider])}</td>
				{/key}
			{/if}
		{/each}
		{#if paywalled}
			<BodyCell {range} {count} />
		{/if}
	</tr>
{/if}

<style>
	/**
	* Table cell styles
	*/
	td:first-child {
		@apply bg-gray-light pr-0.5 sm:pr-1.5;
	}

	tr {
		@apply border-t border-gray-300;
	}

	tr > *:not(:last-child) {
		@apply border-r border-gray-300;
	}

	tr > *:not(:first-child) {
		@apply text-right;
	}

	td {
		@apply min-w-[97px] py-[5px] px-2.5;
	}

	@media screen and (min-width: 1025px) {
		tr:hover td {
			@apply bg-blue-row_hover;
		}
		tr:hover:global td {
			@apply bg-blue-row_hover;
		}
	}

	/**
	* Hover chart styles
	*/
	tr td:first-child {
		@apply flex flex-row justify-between items-center;
	}

	/**
	 * Modify the styles of the table rows
	*/
	.bolded {
		@apply font-semibold;
	}

	.bordered {
		@apply border-b-2 border-gray-300;
	}

	.indented {
		@apply text-[0.85rem] sm:text-[0.95rem];
	}

	.indented td:first-child {
		@apply pl-5;
	}

	.extrabolded {
		@apply font-bold;
	}
</style>
