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

	// Get the active user, if any
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
	 * Each row in the table is an array of items
	 * The first row is an array of the column names
	 * The other rows are the data
	 */
	let exportData: any
	$: if ($user?.isPro) {
		let newData = []

		// The columns
		newData[0] = columns.map((column) => column.title)
		let columnIds = columns.map((column) => column.id)

		// The data rows
		data.forEach((item: { [x: string]: any }) => {
			let arr = columnIds.map((id) => item[id])
			newData.push(arr)
		})
		exportData = newData
	}
</script>

<div>
	<div class="controls" class:no-border={config.styling?.noBorder}>
		<div class="title-group">
			<h2>{title}</h2>
		</div>
		<div class="btn-group">
			<Controls {config} bind:filter={$state.filter} data={exportData} />
		</div>
	</div>
	<table class="symbol-table">
		<thead>
			<tr>
				{#each columns as item (item.id)}
					{#if config.sortable}
						<th on:click={() => sort(item.id)} class="cursor-pointer {item.class}">{item.title}</th>
					{:else}
						<th class={item.class}>{item.title}</th>
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
									<td class={item.class}>{@html formatCell(item.format, row[item.id])}</td>
								{:else}
									<td class={item.class}>{row[item.id]}</td>
								{/if}
							{/each}
						</tr>
					{/if}
				{:else}
					<tr>
						{#each columns as item}
							{#if item.format}
								<td class={item.class}>{@html formatCell(item.format, row[item.id])}</td>
							{:else}
								<td class={item.class}>{row[item.id]}</td>
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
	.controls.no-border {
		@apply border-t-0 pt-0;
	}

	.controls.no-border h2 {
		@apply font-bold;
	}

	table tr > *:nth-child(n + 4) {
		@apply text-right;
	}

	table tr td {
		@apply max-w-[260px] truncate whitespace-nowrap;
	}

	.hide-column-mobile {
		@apply hidden sm:table-cell;
	}
</style>
