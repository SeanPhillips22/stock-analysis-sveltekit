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
	import StockTableBody from './__StockTableBody.svelte'

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
</script>

<!-- <StockTableBody /> -->
