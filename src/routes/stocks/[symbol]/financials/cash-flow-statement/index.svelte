<script lang="ts">
	import StockLayout from '$lib/components/StockLayout.svelte'
	import FinancialTable from '$lib/components/Pages/Financials/_FinancialTable.svelte'
	import { MAP_CASH_FLOW_STATEMENT } from '$lib/components/Pages/Financials/maps/map_cash_flow_statement'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Range } from '$lib/components/Pages/Financials/types'

	export let data: { info: Info; data: FinancialData; count: number; range: Range }
</script>

<svelte:head>
	<title>{data.info.nameFull} ({data.info.ticker}) Cash Flow Statement</title>
</svelte:head>

<StockLayout state={{ info: data.info, data }}>
	<FinancialTable
		statement="cash-flow-statement"
		range="annual"
		title="Cash Flow Statement"
		map={MAP_CASH_FLOW_STATEMENT}
	/>
</StockLayout>
