<script lang="ts">
	import FinancialsNavigation from '$lib/components/Pages/Financials/FinancialsNavigation.svelte'
	import { capitalize } from '$lib/functions/utils/capitalize'
	import { formatYear } from './functions'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Statement, Range, FinancialsMap } from './types'
	import BodyRow from './BodyRow.svelte'

	export let info: Info
	export let data: { data: FinancialData; count: number; range: Range }
	export let statement: Statement
	export let range: Range
	export let title: string
	export let map: FinancialsMap[]

	let d = data.data // The actual data
	let headerRow = d.datekey

	// The title for the header row
	let headerRowTitle = 'Year'
	if (range === 'quarterly') headerRowTitle = 'Quarter Ended'
	else if (range === 'trailing') headerRowTitle = 'Quarter Ending'
</script>

<FinancialsNavigation {info} {statement} range={range || 'annual'} />

<div class="title-area">
	<h2>{title} ({capitalize(range) || 'Annual'})</h2>
	<div>Buttons</div>
</div>

<div class="table-wrap">
	<table>
		<thead>
			<tr>
				<th>{headerRowTitle}</th>
				{#each headerRow as header}
					{#if range === 'annual'}
						<th>{formatYear(header, statement)}</th>
					{:else if statement === 'ratios' && header === 'TTM'}
						<th>Current</th>
					{:else}
						<th>{header}</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each map as row}
				<BodyRow {row} data={d[row.id]} />
			{/each}
		</tbody>
	</table>
</div>

<style>
	.title-area {
		@apply md:flex md:flex-row md:items-end md:justify-between;
	}

	h2 {
		@apply mb-1 text-[1.3rem] font-bold bp:text-2xl md:mb-3;
	}

	.table-wrap {
		@apply overflow-x-auto border border-gray-300;
	}

	table {
		@apply w-full whitespace-nowrap;
	}

	tr:not(:first-child) {
		@apply border-t border-gray-300;
	}

	thead tr {
		@apply border-b-2 border-gray-300 bg-gray-light;
	}

	th {
		@apply py-[7px] px-3 font-semibold;
	}

	tr > *:not(:last-child) {
		@apply border-r border-gray-300;
	}

	tr > *:first-child {
		@apply text-left;
	}

	tr > *:not(:first-child) {
		@apply text-right;
	}
</style>
