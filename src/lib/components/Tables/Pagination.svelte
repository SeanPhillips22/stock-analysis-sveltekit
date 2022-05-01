<script lang="ts">
	import { state, setPage, setPerPage } from './tableStore'

	import ChevronLeft from '$lib/icons/ChevronLeft.svelte'
	import ChevronRight from '$lib/icons/ChevronRight.svelte'
	import Dropdown from '../Dropdown/_Dropdown.svelte'
	import type { PaginationOptions } from './types'
	import LockClosed from '$lib/icons/LockClosed.svelte'
	import Check from '$lib/icons/Check.svelte'

	export let pagination: PaginationOptions
	export let results: number
	export let perPage: number

	// Calculate the total number of pages that are available to paginate through
	$: totalPages = Math.ceil(results / perPage)

	const previousPage = () => setPage($state.page - 1)
	const nextPage = () => setPage($state.page + 1)

	// TODO - if proOnly and not pro, forward to /pro/
	const setPerPageHandler = (perPage: number, proOnly?: boolean) => {
		if (proOnly) {
			return alert('You are not pro')
		}

		setPerPage(perPage)
		setPage(1)
	}
</script>

<nav>
	<button on:click={previousPage} disabled={$state.page === 1} class="previous">
		<ChevronLeft classes="-mb-px h-5 w-5 text-gray-600 bp:mr-1" />
		Previous
	</button>

	<div class="rows-wrap">
		<div>
			<span class="hidden sm:inline cursor-pointer" on:click={() => setPerPage(100)}>Page </span>
			{$state.page} of {totalPages}
		</div>

		<Dropdown title={totalPages === 1 ? 'All Rows' : `${perPage} Rows`}>
			{#each pagination.pageOptions as { option, title, proOnly } (option)}
				<div
					class="dd"
					class:active={perPage === option}
					on:click={() => setPerPageHandler(option, proOnly)}
					title={proOnly ? 'Upgrade to Pro to select this option' : `Show ${option} rows per page`}
				>
					{title || option}
					{#if perPage === option}
						<Check classes="h-4 w-4" />
					{:else if proOnly}
						<LockClosed classes="h-4 w-4 text-gray-500" />
					{/if}
				</div>
			{/each}
		</Dropdown>
	</div>

	<button on:click={nextPage} disabled={$state.page === totalPages} class="next">
		Next
		<ChevronRight classes="-mb-px h-5 w-5 text-gray-600 bp:ml-1" />
	</button>
</nav>

<style type="text/postcss">
	nav {
		@apply mt-2.5 flex flex-row justify-between space-x-1 px-1 text-sm bp:space-x-2 sm:text-base;
	}

	.previous {
		@apply relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 bp:pr-2 bp:text-sm sm:pr-3 sm:pl-1;
	}

	.rows-wrap {
		@apply flex items-center gap-x-3;
	}

	.next {
		@apply relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 bp:pl-2 bp:text-sm sm:pl-3 sm:pr-1;
	}

	button:disabled {
		@apply bg-gray-50;
	}
</style>
