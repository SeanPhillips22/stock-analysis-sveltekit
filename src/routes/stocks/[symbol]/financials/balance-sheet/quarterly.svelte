<script lang="ts">
	import { page } from '$app/stores'
	import FinancialTable from '$lib/components/Pages/Financials/_FinancialTable.svelte'
	import { MAP_BALANCE_SHEET } from '$lib/components/Pages/Financials/maps/map_balance_sheet'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Range } from '$lib/components/Pages/Financials/types'

	export let data: { data: FinancialData; count: number; range: Range }
	let info: Info = $page.stuff.info
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Balance Sheet</title>
</svelte:head>

<FinancialTable
	{info}
	{data}
	statement="balance-sheet"
	range="quarterly"
	title="Balance Sheet"
	map={MAP_BALANCE_SHEET}
/>
