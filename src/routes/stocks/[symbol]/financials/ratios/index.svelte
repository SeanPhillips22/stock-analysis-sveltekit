<script lang="ts">
	import FinancialTable from '$lib/components/Pages/Financials/_FinancialTable.svelte'
	import { MAP_RATIOS } from '$lib/components/Pages/Financials/maps/map_ratios'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Range } from '$lib/components/Pages/Financials/types'
	import StockLayout from '$lib/components/StockLayout.svelte'

	export let data: { info: Info; data: FinancialData; count: number; range: Range }
</script>

<svelte:head>
	<title>{data.info.nameFull} ({data.info.ticker}) Financial Ratios and Metrics</title>
</svelte:head>

<StockLayout state={{ info: data.info, data }}>
	<FinancialTable statement="ratios" range="annual" title="Ratios and Metrics" map={MAP_RATIOS} />
</StockLayout>
