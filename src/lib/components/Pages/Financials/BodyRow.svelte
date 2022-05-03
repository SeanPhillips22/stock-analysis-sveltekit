<script lang="ts">
	import { formatCell } from './functions'

	import type { FinancialsMap } from './types'

	export let row: FinancialsMap
	export let data: number[] | undefined

	// Count how many valid items in order to skip rows with only zeros
	let valid = data?.filter((d) => d !== null && d !== 0)
</script>

{#if data && valid && valid.length}
	<tr class={row.class}>
		{#if row.indent}
			<td>{row.title}</td>
		{:else}
			<td>{row.title}</td>
		{/if}
		{#each data as point}
			{#if row.format === 'growth' || row.format === 'inverted-growth'}
				<td>{@html formatCell(row.format, point, 1000000)}</td>
			{:else}
				<td>{formatCell(row.format, point, 1000000)}</td>
			{/if}
		{/each}
	</tr>
{/if}

<style>
	td:first-child {
		@apply bg-gray-light pr-0.5 sm:pr-1.5;
	}

	tr {
		@apply border-t border-gray-300;
	}

	tr > *:not(:last-child) {
		@apply border-r border-gray-300;
	}

	tr > *:not(:first-child) {
		@apply text-right;
	}

	td {
		@apply min-w-[97px] py-[5px] px-2.5;
	}

	.bolded {
		@apply font-semibold;
	}

	.bordered {
		@apply border-b-2 border-gray-300;
	}

	.indented {
		@apply text-[0.85rem] sm:text-[0.95rem];
	}

	.indented td:first-child {
		@apply pl-5;
	}
</style>
