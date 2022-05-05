<script lang="ts">
	import { quote } from '$lib/stores/quoteStore'
	import type { Overview } from '$lib/types/OverviewPageData'
	import type { Info } from '$lib/types/Info'

	export let info: Info
	export let data: Overview
	let q = $quote || info.quote

	let previous = 'Previous Close'
	if (info.ipoDate && $quote.td === info.ipoDate) previous = 'IPO Price'
</script>

<table>
	<tbody>
		<tr>
			<td>Volume</td>
			<td>{$quote.v && $quote.v !== '0' ? $quote.v : 'n/a'}</td>
		</tr>
		<tr>
			<td>Open</td>
			<td>{$quote.o && $quote.o !== '0.00' ? $quote.o : 'n/a'}</td>
		</tr>
		<tr>
			<td>{previous}</td>
			<td>{$quote.cl && $quote.cl !== '0.00' ? $quote.cl : 'n/a'}</td>
		</tr>
		<tr>
			<td>Day&apos;s Range</td>
			<td>{$quote.l && $quote.h && $quote.l !== '0.00' && $quote.h !== '0.00' ? $quote.l + ' - ' + $quote.h : 'n/a'}</td
			>
		</tr>
		<tr>
			<td>52-Week Range</td>
			<td
				>{$quote.l52 && $quote.h52 && $quote.l52 !== '0.00' && $quote.h52 !== '0.00'
					? $quote.l52 + ' - ' + $quote.h52
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
