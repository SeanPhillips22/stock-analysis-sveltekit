<script lang="ts">
	import FinancialTable from '$lib/components/Pages/Financials/_FinancialTable.svelte'
	import { MAP_BALANCE_SHEET } from '$lib/components/Pages/Financials/maps/map_balance_sheet'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Range } from '$lib/components/Pages/Financials/types'
	import StockLayout from '$lib/components/StockLayout.svelte'

	export let data: { info: Info; data: FinancialData; count: number; range: Range }
</script>

<svelte:head>
	<title>{data.info.nameFull} ({data.info.ticker}) Balance Sheet</title>
</svelte:head>

<StockLayout state={{ info: data.info, data }}>
	<FinancialTable statement="balance-sheet" range="trailing" title="Balance Sheet" map={MAP_BALANCE_SHEET} />
</StockLayout>
