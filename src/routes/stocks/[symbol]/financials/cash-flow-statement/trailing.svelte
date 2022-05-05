<script lang="ts">
	import StockLayout from '$lib/components/StockLayout.svelte'
	import FinancialTable from '$lib/components/Pages/Financials/_FinancialTable.svelte'
	import { MAP_CASH_FLOW_STATEMENT } from '$lib/components/Pages/Financials/maps/map_cash_flow_statement'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Range } from '$lib/components/Pages/Financials/types'

	export let data: { info: Info; data: FinancialData; count: number; range: Range }
	$: info = data.info
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Cash Flow Statement</title>
</svelte:head>

<StockLayout {info}>
	<FinancialTable
		{info}
		{data}
		statement="cash-flow-statement"
		range="trailing"
		title="Cash Flow Statement"
		map={MAP_CASH_FLOW_STATEMENT}
	/>
</StockLayout>
