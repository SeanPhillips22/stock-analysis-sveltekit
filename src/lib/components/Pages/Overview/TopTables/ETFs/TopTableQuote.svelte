<script lang="ts">
	import { getContext } from 'svelte'

	import type { Overview } from '$lib/types/OverviewPageData'
	import type { Info } from '$lib/types/Info'

	const info: Info = getContext('info')
	const data: Overview = getContext('data')
	let q = info.quote

	let previous = 'Previous Close'
	if (info.ipoDate && q.td === info.ipoDate) previous = 'IPO Price'
</script>

<table>
	<tbody>
		<tr>
			<td>Volume</td>
			<td>{q?.v && q.v !== '0' ? q.v : 'n/a'}</td>
		</tr>
		<tr>
			<td>Open</td>
			<td>{q?.o && q.o !== '0.00' ? q.o : 'n/a'}</td>
		</tr>
		<tr>
			<td>{previous}</td>
			<td>{q?.cl && q.cl !== '0.00' ? q.cl : 'n/a'}</td>
		</tr>
		<tr>
			<td>Day&apos;s Range</td>
			<td>{q?.l && q?.h && q.l !== '0.00' && q.h !== '0.00' ? q.l + ' - ' + q.h : 'n/a'}</td>
		</tr>
		<tr>
			<td>52-Week Low</td>
			<td>{q?.l52 || 'n/a'}</td>
		</tr>
		<tr>
			<td>52-Week High</td>
			<td>{q?.h52 || 'n/a'}</td>
		</tr>
		<tr>
			<td>Beta</td>
			<td>{data.beta}</td>
		</tr>
		<tr>
			<td>Holdings</td>
			<td>{data.holdings}</td>
		</tr>
		<tr>
			<td>Inception Date</td>
			<td>{data.inception}</td>
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
