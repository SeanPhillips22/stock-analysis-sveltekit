<script lang="ts">
	import ThreeDotMenu from '$lib/components/Dropdown/ThreeDotMenu.svelte'
	import type { Sorted } from '$lib/components/Tables/types'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { StockTableConfig, TableState } from '../types'

	export let config: StockTableConfig
	let state: Writable<TableState> = getContext('state')
	let initialStateString: string = getContext('initialState')

	// Function to reset the table state
	// Parse the stringified initialState and set the state to the parsed state
	// Also reset the table to its original sort
	function resetState() {
		let initialState = JSON.parse(initialStateString)
		let main = initialState.query.main
		let sortDirection = initialState.query.sortDirection
		let sorted: Sorted = { [main]: sortDirection }
		$state = { ...initialState, sorted }
		localStorage.removeItem(config.tableId)
	}
</script>

<ThreeDotMenu>
	<div class="dd" title="Open list in stock screener">Open in Screener</div>
	<div class="dd" title="Reset all settings to their default values" on:click={resetState}>Reset Table Settings</div>
</ThreeDotMenu>
