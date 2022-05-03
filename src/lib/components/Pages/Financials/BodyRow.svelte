<script lang="ts">
	import HoverChart from '$lib/icons/HoverChart.svelte'
	import { formatCell } from './functions'

	import type { FinancialsMap } from './types'

	export let row: FinancialsMap
	export let data: number[] | undefined

	// Count how many valid items in order to skip rows with only zeros
	let valid = data?.filter((d) => d !== null && d !== 0)
</script>

{#if data && valid && valid.length}
	<tr class={row.class}>
		<td>
			<span>{row.title}</span>
			<div class="icon">
				<HoverChart />
			</div>
		</td>
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
	/**
	* Table cell styles
	*/
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

	@media screen and (min-width: 1025px) {
		tr:hover td {
			@apply bg-blue-row_hover;
		}
	}

	/**
	* Hover chart styles
	*/
	tr td:first-child {
		@apply flex flex-row justify-between items-center;
	}

	.icon {
		@apply relative z-10 border border-t-0 border-transparent p-[3px] delay-200;
	}

	.icon:global svg {
		@apply my-0 mx-1 h-[22px] w-[22px] stroke-[#777];
	}

	.icon:hover:global {
		@apply z-50 border-gray-200 bg-white;
	}

	.icon:hover:global svg {
		@apply stroke-[#2c6288];
	}

	.icon:global svg:focus {
		@apply stroke-[#2c6288];
	}

	/**
	 * Modify the styles of the table rows
	*/
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