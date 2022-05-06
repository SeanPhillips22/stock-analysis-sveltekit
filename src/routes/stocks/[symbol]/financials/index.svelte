<script lang="ts">
	import FinancialTable from '$lib/components/Pages/Financials/_FinancialTable.svelte'
	import { MAP_INCOME_STATEMENT } from '$lib/components/Pages/Financials/maps/map_income_statement'

	import type { FinancialData, Range } from '$lib/components/Pages/Financials/types'
	import type { Info } from '$lib/types/Info'
	import StockLayout from '$lib/components/StockLayout.svelte'

	export let data: { info: Info; data: FinancialData; count: number; range: Range }
</script>

<svelte:head>
	<title>{data.info.nameFull} ({data.info.ticker}) Financial Statements: Income</title>
</svelte:head>

<StockLayout state={{ info: data.info, data }}>
	<FinancialTable statement="income-statement" range="annual" title="Income Statement" map={MAP_INCOME_STATEMENT} />
</StockLayout>
