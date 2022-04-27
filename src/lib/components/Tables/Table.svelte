<script lang="ts">
	/**
	 *
	 */
	import { formatCell } from './formatCell'
	import { sortColumn } from './sort'
	import type { Column, Sorted, TableConfig, TableData } from './types'

	// Props that are passed to the Table component
	export let columns: Column[]
	export let data: TableData
	export let config: TableConfig

	data = data.slice(0, 100)
	/**
	 * Sort
	 */
	// Make a copy of the data array so it can be sorted without changing the original
	let sortedData = [...data]

	let sorted: Sorted = {}
	function sort(id: string) {
		let { returnedData, returnedSorted } = sortColumn(sortedData, data, id, sorted)
		// Assign the variables to trigger a state update
		sortedData = returnedData
		sorted = returnedSorted
	}
</script>

<table>
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
		{#each sortedData as row}
			<tr>
				{#each columns as item}
					{#if item.format}
						<td>{@html formatCell(item.format, row[item.id])}</td>
					{:else}
						<td>{row[item.id]}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style type="text/postcss">
	table tr th {
		@apply bg-white text-left border-t border-gray-200 whitespace-nowrap;
	}

	table tr > * {
		@apply p-2 border-b border-gray-200;
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
</style>
