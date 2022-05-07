<script lang="ts">
	/**
	 * Handle the state management for a single StockTable.
	 * Create a reactive context for the state.
	 * Sync parts of the state to localStorage.
	 */
	import type { InitialTableProps } from './types'
	export let initialState: InitialTableProps
</script>

<slot />
