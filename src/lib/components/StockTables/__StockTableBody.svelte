<script lang="ts">
	import { browser } from '$app/env'
	import { writable } from 'svelte/store'
	import { onDestroy, setContext } from 'svelte'

	// Get the active user, if any
	import { user } from '$lib/auth/userStore'

	import { fetchSelect } from './fetchSelect'
	import { formatTableCell } from '$lib/functions/formatTableCell'
	import { getColumns } from './getColumns'
	import { stringifyObject } from '$lib/functions/utils/stringifyObject'
	import { isObjectEmpty } from '$lib/functions/utils/isObjectEmpty'
	import { sortColumn } from '../Tables/sort'
	import StockTableControls from './_StockTableControls.svelte'

	import type { Sorted, StockTableConfig, TableData, TableQuery, TableState } from './types'
	import type { DataId } from '$lib/types/DataId'
	import { parseExportData } from '$lib/functions/parseExportData'

	export let config: StockTableConfig
	export let initialQuery: TableQuery
	export let initialData: TableData

	const initialState = {
		query: initialQuery,
		sorted: {},
		filter: '',
		page: 1
	}

	const initialStringified = stringifyObject(initialState)

	/**
	 * The table state, which persists on page refresh
	 * by storing the state in localStorage.
	 */
	function getStoredState() {
		if (browser) {
			try {
				let stored = localStorage.getItem(config.tableId)
				if (stored) {
					let parsed = JSON.parse(stored)
					return parsed
				}
			} catch {
				// Fail silently and return the initial state
			}
		}
		return { ...initialState }
	}

	// Set the initial state
	let state = writable<TableState>(getStoredState())
	setContext('state', state)

	// Subscribe to state updates and save them to localStorage
	let unsubscribe = state.subscribe((value) => {
		if (browser) {
			let stringified = stringifyObject(value)
			if (stringified === initialStringified) {
				localStorage.removeItem(config.tableId)
			} else {
				// If not same as default, fetch new data and store the new query
				if (JSON.stringify(value.query.columns) !== JSON.stringify(initialQuery.columns)) {
					console.log('should maybe fetch new data')
					fetchNewTableData()
				}
				localStorage.setItem(config.tableId, stringified)
			}
		}
	})
	onDestroy(unsubscribe)

	// Fetch new data when necessary
	let fetchedData: TableData
	async function fetchNewTableData() {
		let res = await fetchSelect($state.query)
		fetchedData = res.data
		console.log(fetchedData[0])
		initialData = fetchedData
	}

	$: columns = getColumns($state.query.columns, $state.query.main)

	/**
	 * Filter
	 */
	$: filteredData = [...initialData]
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
	$: sortedData = [...filteredData]
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
			let newObj: Sorted = { [id]: 'desc' }
			$state.sorted = newObj
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
