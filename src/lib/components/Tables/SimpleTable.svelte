<script>
	/*
    {
        id: the id of the column
        title: the title of the column
        format?: the name of the formatting function
        class?: classes to apply to the column
    }
    */
	import { formatCell } from './formatCell'

	export let columns
	export let data
</script>

<table>
	<thead>
		<tr>
			{#each columns as item}
				<th>{item.title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row}
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

<style>
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
