<script lang="ts">
	/**
	 * TODO make sure quarterly growth offset is correctly calculated for recent IPOs
	 * TODO make sure stocks with alternative financial sources work too
	 */
	import { info } from '$lib/stores/infoStore'
	import { data } from '$lib/stores/dataStore'
	import { state } from '$lib/stores/financialsStore'
	import { formatYear } from './functions'

	import FinancialsNavigation from '$lib/components/Pages/Financials/FinancialsNavigation.svelte'
	import BodyRow from './BodyRow.svelte'

	import type { Statement, Range, FinancialsMap } from './types'

	import { user } from '$lib/auth/userStore'
	import FinancialControls from './FinancialControls.svelte'
	import TableTitle from './TableTitle.svelte'
	import FinancialSource from './FinancialSource.svelte'
	import HeaderCell from './Paywall/HeaderCell.svelte'

	export let statement: Statement
	export let range: Range
	export let title: string
	export let map: FinancialsMap[]

	// The data rows
	// If showTTM and showCurrent are false, then remove the first item from the array (if applicable)
	// If leftToRight is set as true, reverse the order of the header row
	// the order of the data rows is reversed in the BodyRow component
	let d: any = {}
	let headerRow: any[]
	$: {
		if (
			$data.data?.datekey[0] === 'TTM' &&
			((statement !== 'ratios' && !$state.showTTM) || (statement === 'ratios' && !$state.showCurrent))
		) {
			Object.keys({ ...$data.data }).forEach((key) => {
				let [first, ...rest] = $data.data[key]
				d[key] = rest
			})
		} else {
			d = { ...$data.data }
		}
		headerRow = $state.leftToRight ? [...d.datekey].reverse() : [...d.datekey]
	}

	// The title for the header row
	let headerRowTitle = 'Year'
	if (range === 'quarterly') headerRowTitle = 'Quarter Ended'
	else if (range === 'trailing') headerRowTitle = 'Quarter Ending'

	/**
	 * If pro user, fetch the full data
	 */
	let fetchedFullData = false
	let exportData: any[] = []
	async function fetchFullData() {
		if (fetchedFullData) return
		fetchedFullData = true
		let host = import.meta.env.VITE_PUBLIC_API_URL
		let url = `${host}/financials?type=${statement}&symbol=${$info.symbol}&range=${range}`
		url += '&f=' + import.meta.env.VITE_PUBLIC_PRO_KEY

		const res = await fetch(url)
		const fullData = await res.json()

		$data.data = fullData.data
		let fullHeaderRow = fullData.data.datekey

		// Rewrite the financial data to make it ready for export
		// It should be an array of arrays
		exportData[0] = [headerRowTitle, ...fullHeaderRow]
		Object.keys(d).forEach((key) => {
			if (key === 'datekey') return
			if (statement === 'income-statement' && key === 'fcf') return // Can remove later

			// Get the map object, data array and title
			let mapObject = map.find((m) => m.id === key)
			let dataArray = d[key]
			let title = mapObject?.title

			// If no valid items in array, skip it
			let valid = dataArray.filter((a: any) => a !== null && a !== 0)
			if (!valid.length) return

			// Push the array into the export data
			exportData.push([title, ...dataArray])
		})
	}
	$: {
		if ((range === 'annual' && $data.count > 10) || $data.count > 40) {
			if ($user?.isPro) {
				fetchFullData()
			}
		}
	}

	$: paywalled = !$user?.isPro && ((range === 'annual' && $data.count > 10) || $data.count > 40)
</script>

<FinancialsNavigation {statement} range={range || 'annual'} />

<div class="title-area">
	<TableTitle {title} {range} {statement} />
	<FinancialControls data={exportData} {range} {statement} />
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
				{#if paywalled}
					<HeaderCell {range} count={$data.count} last={headerRow[headerRow.length - 1]} />
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each map as row}
				{#if d[row.id]}
					<BodyRow {row} dates={headerRow} data={d[row.id]} {range} {paywalled} count={$data.count} />
				{/if}
			{/each}
		</tbody>
	</table>
</div>

<FinancialSource />

<style type="text/postcss">
	.title-area {
		@apply md:flex md:flex-row md:items-end md:justify-between;
	}

	.table-wrap {
		@apply overflow-x-auto overflow-y-visible border border-gray-300;
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
