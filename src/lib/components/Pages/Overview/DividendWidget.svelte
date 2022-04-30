<script lang="ts">
	/**
	 * The dividend widget shown on ETF overview pages
	 */
	import { getContext } from 'svelte'

	import Button from '$lib/components/Buttons/Button.svelte'

	import type { Info } from '$lib/types/Info'
	import type { Overview } from '$lib/types/OverviewPageData'

	const info: Info = getContext('info')
	const data: Overview = getContext('data')
	let d = data.dividendTable
</script>

{#if d?.length}
	<div>
		<h2>Dividends</h2>

		<table>
			<thead>
				<tr>
					<th>Ex-Dividend</th>
					<th>Amount</th>
					<th>Pay Date</th>
				</tr>
			</thead>
			<tbody>
				{#each d as item}
					<tr>
						<td>{item.exDate}</td>
						<td>${item.amount}</td>
						<td>{item.payDate}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<Button
			href="/etf/{info.symbol}/dividend/"
			title="Full Dividend History"
			classes="text-lg bp:text-xl mt-4 w-full"
		/>
	</div>
{/if}

<style>
	h2 {
		@apply mb-2;
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
