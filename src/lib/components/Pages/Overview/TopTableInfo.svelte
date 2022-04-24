<script>
	export let data
</script>

<table>
	<tbody>
		<tr>
			<td>Market Cap</td>
			<td>{data.marketCap}</td>
		</tr>
		<tr>
			<td>Revenue (ttm)</td>
			<td>{data.revenue}</td>
		</tr>
		<tr>
			<td>Net Income (ttm)</td>
			<td>{data.netIncome}</td>
		</tr>
		<tr>
			<td>Shares Out</td>
			<td>{data.sharesOut}</td>
		</tr>
		<tr>
			<td>EPS (ttm)</td>
			<td>{data.eps}</td>
		</tr>
		<tr>
			<td>PE Ratio</td>
			<td>{data.peRatio}</td>
		</tr>
		<tr>
			<td>Forward PE</td>
			<td>{data.forwardPE}</td>
		</tr>
		<tr>
			<td>Dividend</td>
			<td>{data.dividend}</td>
		</tr>
		<tr>
			<td>Ex-Dividend Date</td>
			<td>{data.exDividendDate}</td>
		</tr>
	</tbody>
</table>

<style>
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
