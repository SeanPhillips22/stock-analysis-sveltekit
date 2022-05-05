<script lang="ts">
	import FinancialTable from '$lib/components/Pages/Financials/_FinancialTable.svelte'
	import { MAP_INCOME_STATEMENT } from '$lib/components/Pages/Financials/maps/map_income_statement'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Range } from '$lib/components/Pages/Financials/types'
	import StockLayout from '$lib/components/StockLayout.svelte'

	export let data: { info: Info; data: FinancialData; count: number; range: Range }
	$: info = data.info
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Financial Statements: Income</title>
</svelte:head>

<StockLayout {info}>
	<FinancialTable
		{info}
		{data}
		statement="income-statement"
		range="quarterly"
		title="Income Statement"
		map={MAP_INCOME_STATEMENT}
	/>
</StockLayout>
