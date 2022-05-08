<script lang="ts">
	import { browser } from '$app/env'
	import { writable } from 'svelte/store'
	import { setContext } from 'svelte'

	// Get the active user, if any
	import { user } from '$lib/auth/userStore'

	import { fetchSelect } from './fetchSelect'
	import { formatTableCell } from '$lib/functions/formatTableCell'
	import { getColumns } from './getColumns'
	import { stringifyObject } from '$lib/functions/utils/stringifyObject'
	import { isObjectEmpty } from '$lib/functions/utils/isObjectEmpty'
	import { sortColumn } from '../Tables/sort'
	import StockTableControls from './__StockTableControls.svelte'

	import type { StockTableConfig, TableData, TableQuery, TableState } from './types'
	import type { DataId } from '$lib/types/DataId'
	import { parseExportData } from '$lib/functions/parseExportData'

	export let config: StockTableConfig
	export let initialQuery: TableQuery
	export let initialData: TableData

	export const state = writable<TableState>({
		sorted: {},
		filter: '',
		page: 1
	})

	setContext('state', state)

	/**
	 * Handle the dynamic query, which will be synced to localStorage
	 *
	 * TODO when this changes, fetch new data -- maybe a function fetchNewTableData that returns loading, error, data
	 */
	let query = writable({ ...initialQuery })
	setContext('query', query)

	$: {
		if (browser) {
			let storedQuery = localStorage.getItem(config.tableId)
			if (storedQuery) {
				let parsedQuery = JSON.parse(storedQuery)
				$query = parsedQuery
			}
		}
	}

	let fetchedData: TableData
	async function fetchNewTableData() {
		fetchedData = await fetchSelect($query)
		// data = fetchedData
	}

	query.subscribe((value) => {
		if (browser) {
			// If same as default, delete the stored value
			if (stringifyObject(value) === stringifyObject(initialQuery)) {
				localStorage.removeItem(config.tableId)
			} else {
				// If not same as default, fetch new data and store the new query
				console.log('should fetch new data')
				fetchNewTableData()
				localStorage.setItem(config.tableId, stringifyObject(value))
			}
		}
	})

	$: columns = getColumns($query.columns, $query.main)

	/**
	 * Filter
	 */
	let filteredData: TableData = [...initialData]
	$: {
		if ($state.filter.length) {
			filteredData = initialData.filter((row) => {
				return Object.values(row).some((value) => {
					return value ? value.toString().toLowerCase().includes($state.filter.toLowerCase()) : false
				})
			})
		}
	}

	/**
	 * Sort
	 */
	let sortedData: TableData = [...filteredData]
	$: {
		if (!isObjectEmpty($state.sorted)) {
			let returnedData = sortColumn(sortedData, filteredData, $state.sorted)
			// @ts-ignore
			sortedData = returnedData
		}
	}

	// Respond to clicks on the column headers by setting a sort state
	function sort(id: DataId) {
		if (isObjectEmpty($state.sorted) || Object.keys($state.sorted)[0] !== id) {
			$state.sorted[id] = 'desc'
		} else if ($state.sorted[id] === 'desc') {
			$state.sorted[id] = 'asc'
		} else {
			$state.sorted = {}
			sortedData = [...filteredData]
		}
	}

	// If data is filtered, show that. Else, show the sorted data.
	$: data = $state.filter.length ? filteredData : sortedData

	/**
	 * Export
	 */
	let exportData: any[][]
	$: if ($user?.isPro) {
		exportData = parseExportData(columns, data)
	}
</script>

<!-- on:click={() => sort(id)} -->
<div class="wrap">
	<StockTableControls {config} data={exportData} />
	<table class="symbol-table">
		<thead>
			<tr>
				{#each columns as { id, title, classes } (id)}
					<th class="cursor-pointer {classes}" on:click={() => sort(id)}>{title}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as row, i (i)}
				<tr>
					{#each columns as { id, format, classes } (id)}
						{#if format}
							<td class={classes}>{@html formatTableCell(format, row[id])}</td>
						{:else}
							<td class={classes}>{row[id]}</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style type="text/postcss">
	.wrap {
		@apply overflow-x-auto;
	}

	table {
		@apply whitespace-nowrap;
	}

	th {
		@apply font-semibold;
	}

	th:nth-child(n + 4),
	td:nth-child(n + 4) {
		@apply text-right;
	}
</style>
