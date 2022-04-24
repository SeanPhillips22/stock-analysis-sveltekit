<script>
	export let info
	export let data

	let previous = 'Previous Close'
	if (info.ipoDate && info.quote.td === info.ipoDate) previous = 'IPO Price'
</script>

<table>
	<tbody>
		<tr>
			<td>Volume</td>
			<td>{info.quote?.v && info.quote.v !== '0' ? info.quote.v : 'n/a'}</td>
		</tr>
		<tr>
			<td>Open</td>
			<td>{info.quote?.o && info.quote.o !== '0.00' ? info.quote.o : 'n/a'}</td>
		</tr>
		<tr>
			<td>{previous}</td>
			<td>{info.quote?.cl && info.quote.cl !== '0.00' ? info.quote.cl : 'n/a'}</td>
		</tr>
		<tr>
			<td>Day&apos;s Range</td>
			<td
				>{info.quote?.l && info.quote?.h && info.quote.l !== '0.00' && info.quote.h !== '0.00'
					? info.quote.l + ' - ' + info.quote.h
					: 'n/a'}</td
			>
		</tr>
		<tr>
			<td>52-Week Range</td>
			<td
				>{info.quote?.l52 && info.quote?.h52 && info.quote.l52 !== '0.00' && info.quote.h52 !== '0.00'
					? info.quote.l52 + ' - ' + info.quote.h52
					: 'n/a'}</td
			>
		</tr>
		<tr>
			<td>Beta</td>
			<td>{data.beta}</td>
		</tr>
		<tr>
			<td>Analysts</td>
			<td>{data.analysts}</td>
		</tr>
		<tr>
			<td>Price Target</td>
			<td>{data.target}</td>
		</tr>
		<tr>
			<td>Earnings Date</td>
			<td>{data.earningsDate}</td>
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
