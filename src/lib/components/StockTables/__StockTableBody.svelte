<script lang="ts">
	import type { Writable } from 'svelte/store'
	import { getContext } from 'svelte'

	// Get the active user, if any
	import { user } from '$lib/auth/userStore'

	import { formatTableCell } from '$lib/functions/formatTableCell'
	import { getColumns } from './getColumns'
	import { isObjectEmpty } from '$lib/functions/utils/isObjectEmpty'
	import { sortColumn } from '../Tables/sort'
	import StockTableControls from './_StockTableControls.svelte'

	import type { Sorted, StockTableConfig, TableData, TableState } from './types'
	import type { DataId } from '$lib/types/DataId'
	import { parseExportData } from '$lib/functions/parseExportData'
	import ChevronDown from '$lib/icons/ChevronDown.svelte'
	import ChevronUp from '$lib/icons/ChevronUp.svelte'

	export let config: StockTableConfig
	export let initialData: TableData
	let state: Writable<TableState> = getContext('state')

	$: columns = getColumns($state.query.columns, $state.query.main)

	/**
	 * Filter
	 */
	$: filteredData = [...initialData]
	$: {
		if ($state.filter.length) {
			filteredData = initialData.filter((row) => {
				return Object.values(row).some((value) => {
					return value ? value.toString().toLowerCase().includes($state.filter.toLowerCase()) : false
				})
			})
		}
	}

	/**
	 * Sort
	 */
	$: sortedData = [...filteredData]
	$: {
		if (!isObjectEmpty($state.sorted)) {
			let returnedData = sortColumn(sortedData, $state.sorted)
			// @ts-ignore
			sortedData = returnedData
		}
	}

	// Respond to clicks on the column headers by setting a sort state
	function sort(id: DataId) {
		if (isObjectEmpty($state.sorted) || Object.keys($state.sorted)[0] !== id) {
			let newObj: Sorted = { [id]: 'desc' }
			$state.sorted = newObj
		} else if ($state.sorted[id] === 'desc') {
			$state.sorted[id] = 'asc'
		} else {
			$state.sorted = {}
			sortedData = [...filteredData]
		}
	}

	// If data is filtered, show that. Else, show the sorted data.
	$: data = $state.filter.length ? filteredData : sortedData

	/**
	 * Export
	 */
	let exportData: any[][]
	$: if ($user?.isPro) {
		exportData = parseExportData(columns, data)
	}
</script>

<StockTableControls {config} data={exportData} />
<div class="wrap">
	<table class="symbol-table">
		<thead>
			<tr>
				{#each columns as { id, title, classes } (id)}
					{#if Object.keys($state.sorted)[0] === id}
						{#if $state.sorted[id] === 'desc'}
							<th class={classes} on:click={() => sort(id)}><span>{title} <ChevronDown classes="w-4 h-4" /></span></th>
						{:else if $state.sorted[id] === 'asc'}
							<th class={classes} on:click={() => sort(id)}><span>{title} <ChevronUp classes="w-4 h-4" /></span></th>
						{:else}
							<th class={classes} on:click={() => sort(id)}>{title}</th>
						{/if}
					{:else}
						<th class={classes} on:click={() => sort(id)}>{title}</th>
					{/if}
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
		@apply cursor-pointer font-semibold;
	}

	th span {
		@apply flex items-center;
	}

	th:nth-child(n + 4),
	td:nth-child(n + 4) {
		@apply text-right;
	}

	th:nth-child(n + 4) span {
		@apply justify-end;
	}

	th:nth-child(n + 4).sl span {
		@apply justify-start;
	}

	th:nth-child(n + 4).sl,
	td:nth-child(n + 4).sl {
		@apply text-left;
	}
</style>
