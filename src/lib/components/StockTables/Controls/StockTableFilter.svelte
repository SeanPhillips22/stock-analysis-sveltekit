<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import type { TableState } from '../types'

	let state: Writable<TableState> = getContext('state')
	// export let filter: string
</script>

<div class="filter">
	<label for="filter" class="sr-only">Filter results</label>
	<input type="text" name="filter" autocomplete="off" placeholder="Filter..." bind:value={$state.filter} />
</div>

<style type="text/postcss">
	.filter {
		@apply relative flex min-w-[80px] max-w-[100px] items-center xs:max-w-[130px] sm:max-w-[150px];
	}

	input {
		@apply block w-full rounded-md border border-gray-300 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:py-2;
	}

	/* iOS fix for zoom on input field */
	@supports (-webkit-touch-callout: none) {
		input {
			@apply py-1 text-base sm:py-1.5;
		}
	}
</style>
