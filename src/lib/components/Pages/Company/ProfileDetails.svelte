<script lang="ts">
	import { data } from '$lib/stores/dataStore'
	$: details = $data.stockDetails
</script>

<h2>Stock Details</h2>
<div class="wrap">
	<table>
		<tbody>
			{#if details?.symbol}
				<tr>
					<td>Ticker Symbol</td>
					<td>{details.symbol}</td>
				</tr>
			{/if}
			{#if details?.exchange}
				<tr>
					<td>Exchange</td>
					<td>{details.exchange}</td>
				</tr>
			{/if}
			{#if details?.fiscalYear}
				<tr>
					<td>Fiscal Year</td>
					<td>{details.fiscalYear}</td>
				</tr>
			{/if}
			{#if details?.currency}
				<tr>
					<td>Reporting Currency</td>
					<td>{details.currency}</td>
				</tr>
			{/if}
			{#if details?.ipoPrice}
				<tr>
					<td>IPO Price</td>
					<td>{details.ipoPrice}</td>
				</tr>
			{/if}
			{#if details?.cik}
				<tr>
					<td>CIK Code</td>
					<td>{details.cik}</td>
				</tr>
			{/if}
			{#if details?.cusip}
				<tr>
					<td>CUSIP Number</td>
					<td>{details.cusip}</td>
				</tr>
			{/if}
			{#if details?.isin}
				<tr>
					<td>ISIN Number</td>
					<td>{details.isin}</td>
				</tr>
			{/if}
			{#if details?.eid}
				<tr>
					<td>Employer ID</td>
					<td>{details.eid}</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<style type="text/postcss">
	h2 {
		@apply mt-6 xs:mt-8;
	}

	.wrap {
		@apply rounded border border-gray-200 bg-gray-50 px-2 pt-2 pb-2 xs:px-4 xs:pt-2.5;
	}

	table {
		@apply w-full;
	}

	tr:not(:last-child) {
		@apply border-b border-gray-200;
	}

	td {
		@apply py-1.5 px-1 lg:py-2;
	}

	td:first-child {
		@apply font-semibold;
	}

	td:last-child {
		@apply text-right;
	}
</style>
