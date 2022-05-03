<script lang="ts">
	import Controls from './Controls.svelte'
	import { formatCell } from './formatCell'
	import { sortColumn } from './sort'
	import type { Column, TableConfig, TableData } from './types'

	// Props that are passed to the Table component
	export let title: string
	export let columns: Column[]
	export let data: TableData
	export let config: TableConfig

	// The table state store, needed to remember state after navigating from and back
	import { state, setSort, resetSort } from './tableStore'
	import { isObjectEmpty } from '$lib/functions/utils/isObjectEmpty'
	import Pagination from './Pagination.svelte'

	// The authentication state
	import { user } from '$lib/auth/userStore'

	/**
	 * Sort
	 */
	// Make a copy of the data array so it can be sorted without changing the original
	let sortedData = [...data]

	// If a sort state is set, sort the data
	$: {
		if (!isObjectEmpty($state.sorted)) {
			let returnedData = sortColumn(sortedData, data, $state.sorted)
			sortedData = returnedData
		}
	}

	// Respond to clicks on the column headers by setting a sort state
	function sort(id: string) {
		if (isObjectEmpty($state.sorted)) {
			setSort(id, 'desc')
		} else if ($state.sorted[id] === 'desc') {
			setSort(id, 'asc')
		} else {
			resetSort()
			sortedData = data
		}
	}

	/**
	 * Filter
	 */
	let filteredData = sortedData
	$: {
		if ($state.filter.length) {
			filteredData = sortedData.filter((row) => {
				return Object.values(row).some((value) => {
					return value.toString().toLowerCase().includes($state.filter.toLowerCase())
				})
			})
		}
	}

	// If data is filtered, show that. Else, show the sorted data.
	$: displayedData = $state.filter.length ? filteredData : sortedData
	$: perPage = $state.perPage || config.pagination?.perPage || 50

	/**
	 * Rewrite the data to make it ready for export (if Pro user)
	 */
	let exportData: any
	$: if ($user?.isPro) {
		let newData = []

		// The columns
		newData[0] = columns.map((column) => column.title)

		// The data rows
		data.forEach((item: { [x: string]: any }) => {
			newData.push([item.s, item.n, item.i, item.m])
		})
		exportData = newData
	}
</script>

<div>
	<div class="controls">
		<div class="title-group">
			<h2>{title}</h2>
		</div>
		<div class="button-group">
			<Controls {config} bind:filter={$state.filter} data={exportData} />
		</div>
	</div>
	<table id="simple-table">
		<thead>
			<tr>
				{#each columns as item (item.id)}
					{#if config.sortable}
						<th on:click={() => sort(item.id)} class="cursor-pointer">{item.title}</th>
					{:else}
						<th>{item.title}</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each displayedData as row, i}
				{#if config.pagination}
					{#if i >= ($state.page - 1) * perPage && i < $state.page * perPage}
						<tr>
							{#each columns as item}
								{#if item.format}
									<td>{@html formatCell(item.format, row[item.id])}</td>
								{:else}
									<td>{row[item.id]}</td>
								{/if}
							{/each}
						</tr>
					{/if}
				{:else}
					<tr>
						{#each columns as item}
							{#if item.format}
								<td>{@html formatCell(item.format, row[item.id])}</td>
							{:else}
								<td>{row[item.id]}</td>
							{/if}
						{/each}
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
	{#if config.pagination}
		<Pagination
			results={displayedData.length}
			perPage={$state.perPage || config.pagination.perPage}
			pagination={config.pagination}
		/>
	{/if}
</div>

<style type="text/postcss">
	.controls {
		@apply flex items-center border-t border-gray-200 py-1.5 px-0 bp:py-2 md:px-1;
	}

	.controls h2 {
		@apply whitespace-nowrap pl-0.5 text-lg font-semibold tiny:text-xl bp:text-2xl md:pl-0 mb-0;
	}

	.button-group {
		@apply ml-auto;
	}

	table {
		@apply w-full;
	}

	table tr th {
		@apply bg-white text-left border-t border-gray-200 whitespace-nowrap;
	}

	table tr > * {
		@apply p-2 border-b border-gray-200;
	}

	table tr > *:first-child {
		@apply pl-3;
	}

	table tr > *:last-child {
		@apply pr-3;
	}

	table tr:nth-child(odd) {
		background-color: #f6f7f8;
	}

	table tr > *:nth-child(n + 4) {
		@apply text-right;
	}

	table tr td {
		@apply max-w-[260px] truncate whitespace-nowrap;
	}

	table tr:hover td {
		background-color: #f2f9ff !important;
	}
</style>
