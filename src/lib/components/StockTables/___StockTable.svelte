<script lang="ts">
	/**
	 * Send the initial state and data to the table
	 * Fetch new data client-side when needed
	 * Sync with localStorage
	 */
	import { browser } from '$app/env'
	import { writable } from 'svelte/store'
	import { onDestroy, setContext } from 'svelte'

	import { fetchSelect } from './fetchSelect'
	import { stringifyObject } from '$lib/functions/utils/stringifyObject'

	import StockTableBody from './__StockTableBody.svelte'
	import type { StockTableConfig, TableData, TableQuery, TableState } from './types'

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
	const initialColumns = JSON.stringify(initialQuery.columns)
	setContext('initialState', initialStringified) // to prevent the initial state from mutating, no idea why it happens

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
	setContext('config', config)

	// Subscribe to state updates and save them to localStorage
	let unsubscribe = state.subscribe((value) => {
		if (browser) {
			let stringified = stringifyObject(value)
			if (stringified === initialStringified) {
				localStorage.removeItem(config.tableId)
			} else {
				// If not same as default, fetch new data and store the new query
				if (JSON.stringify(value.query.columns) !== initialColumns) {
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
		initialData = fetchedData
	}
</script>

<StockTableBody {config} {initialData} />
