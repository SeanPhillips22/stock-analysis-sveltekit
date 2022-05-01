<script lang="ts">
	/**
	 * The holdings widget shown on ETF overview pages
	 */
	import Button from '$lib/components/Buttons/Button.svelte'

	import type { Info } from '$lib/types/Info'
	import type { Overview } from '$lib/types/OverviewPageData'
	import SymbolLink from '$lib/components/SymbolLink.svelte'

	export let info: Info
	export let data: Overview
	let { list, top10 } = data.holdingsTable || {}
</script>

{#if list && list.length >= 10}
	<div>
		<div class="title">
			<h2>Top 10 Holdings</h2>
			<span>{top10?.toFixed(2)}% of assets</span>
		</div>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Symbol</th>
					<th>Weight</th>
				</tr>
			</thead>
			<tbody>
				{#each list as item (item.symbol)}
					<tr>
						<td class="font-semibold">{item.name}</td>
						<td><SymbolLink symbol={item.symbol} /></td>
						<td>{item.assets}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<Button href="/etf/{info.symbol}/holdings/" title="View More Holdings" classes="text-lg bp:text-xl mt-4 w-full" />
	</div>
{/if}

<style type="text/postcss">
	.title {
		@apply mb-2 flex-row items-end justify-between xs:mb-1 xs:flex;
	}

	h2 {
		@apply mb-0 xs:mb-1;
	}

	.title span {
		@apply text-smaller text-gray-800;
	}

	table {
		@apply w-full text-smaller xs:text-base;
	}

	tr {
		@apply border-y border-gray-200;
	}

	th,
	td {
		@apply py-1.5 px-1.5 xs:px-2 text-left;
	}

	tr > *:last-child {
		@apply text-right;
	}

	table tr th {
		background-color: #fff;
	}
	table tr:nth-child(odd) {
		background-color: #fafbfc;
	}
	table tr:hover td {
		background-color: #f2f9ff !important;
	}
</style>
