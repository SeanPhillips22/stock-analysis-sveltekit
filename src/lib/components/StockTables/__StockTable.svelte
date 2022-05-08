<script lang="ts">
	import StockTableControls from './__StockTableControls.svelte'
	import { formatTableCell } from '$lib/functions/formatTableCell'
	import { getColumns } from './getColumns'

	import type { StockTableConfig, TableData, TableQuery } from './types'
	import { writable } from 'svelte/store'
	import { setContext } from 'svelte'

	export let config: StockTableConfig
	export let initialQuery: TableQuery
	export let initialData: TableData

	$: query = initialQuery // When this changes, fetch new data -- maybe a function fetchNewTableData that returns loading, error, data

	$: columns = getColumns(query.columns, query.main)

	/**
	 * Filter
	 */
	let filter = ''
	// let filter = writable('')
	// setContext('filter', filter)
	let filteredData = [...initialData]
	$: {
		if (filter.length) {
			filteredData = initialData.filter((row) => {
				return Object.values(row).some((value) => {
					return value.toString().toLowerCase().includes(filter.toLowerCase())
				})
			})
		}
	}

	$: data = filter.length ? filteredData : initialData
</script>

<div class="wrap">
	<StockTableControls {config} bind:filter />
	<table class="symbol-table">
		<thead>
			<tr>
				{#each columns as { id, title, classes } (id)}
					<th class={classes}>{title}</th>
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
