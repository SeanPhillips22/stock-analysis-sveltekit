<script lang="ts">
	import type { Overview } from '$lib/types/OverviewPageData'
	export let data: Overview
</script>

<table>
	<tbody>
		<tr>
			<td>Assets</td>
			<td>{data.assets}</td>
		</tr>
		<tr>
			<td>NAV</td>
			<td>{data.nav}</td>
		</tr>
		<tr>
			<td>Expense Ratio</td>
			<td>{data.er}</td>
		</tr>
		<tr>
			<td>PE Ratio</td>
			<td>{data.peRatio}</td>
		</tr>
		<tr>
			<td>Shares Out</td>
			<td>{data.sharesOut}</td>
		</tr>
		<tr>
			<td>Dividend (ttm)</td>
			<td>{data.dividend}</td>
		</tr>
		<tr>
			<td>Dividend Yield</td>
			<td>{data.dividendYield}</td>
		</tr>
		<tr>
			<td>Ex-Dividend Date</td>
			<td>{data.exDividendDate}</td>
		</tr>
		<tr>
			<td>1-Year Return</td>
			<td>{data.change1y || 'n/a'}</td>
		</tr>
	</tbody>
</table>

<style type="text/postcss">
	table {
		@apply w-[48%] text-small text-gray-900 lg:w-auto lg:min-w-[210px];
	}

	table tr {
		@apply flex flex-col border-b border-gray-200 py-1 sm:table-row sm:py-0;
	}

	table tr td {
		@apply whitespace-nowrap py-[1px] px-1 sm:py-2;
	}

	table tr td:last-child {
		@apply text-left text-base font-semibold sm:text-right sm:text-small;
	}
</style>
