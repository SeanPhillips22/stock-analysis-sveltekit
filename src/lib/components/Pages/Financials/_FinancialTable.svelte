<script lang="ts">
	import { capitalize } from '$lib/functions/utils/capitalize'
	import { formatYear } from './functions'

	import FinancialsNavigation from '$lib/components/Pages/Financials/FinancialsNavigation.svelte'
	import BodyRow from './BodyRow.svelte'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Statement, Range, FinancialsMap } from './types'

	import { user } from '$lib/auth/userStore'
	import FinancialControls from './FinancialControls.svelte'
	import TableTitle from './TableTitle.svelte'

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

	/**
	 * If pro user, fetch the full data
	 */
	let exportData: any[] = []
	async function fetchFullData() {
		let host = import.meta.env.VITE_PUBLIC_API_URL
		let url = `${host}/financials?type=${statement}&symbol=${info.symbol}&range=${range}`
		url += '&f=' + import.meta.env.VITE_PUBLIC_PRO_KEY

		const res = await fetch(url)
		const fullData = await res.json()

		d = fullData.data
		headerRow = fullData.data.datekey

		// Rewrite the financial data to make it ready for export
		// It should be an array of arrays
		exportData[0] = [headerRowTitle, ...headerRow]
		Object.keys(d).forEach((key) => {
			if (key === 'datekey') return
			let title = map.find((m) => m.id === key)?.title
			exportData.push([title, ...d[key]])
		})
	}
	$: {
		if ((range === 'annual' && data.count > 10) || data.count > 40) {
			if ($user?.isPro) {
				fetchFullData()
			}
		}
	}
</script>

<FinancialsNavigation {info} {statement} range={range || 'annual'} />

<div class="title-area">
	<TableTitle {info} {title} {range} {statement} />
	<FinancialControls data={exportData} />
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
