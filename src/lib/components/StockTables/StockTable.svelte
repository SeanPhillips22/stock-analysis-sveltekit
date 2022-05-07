<script lang="ts">
	import { formatTableCell } from '$lib/functions/formatTableCell'

	import { getColumns } from './getColumns'

	import type { TableData, TableQuery } from './types'

	export let initialQuery: TableQuery
	$: query = initialQuery // When this changes, fetch new data -- maybe a function fetchNewTableData that returns loading, error, data

	export let initialData: TableData
	$: data = initialData

	$: columns = getColumns(query.columns, query.main)
</script>

<div class="wrap">
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
