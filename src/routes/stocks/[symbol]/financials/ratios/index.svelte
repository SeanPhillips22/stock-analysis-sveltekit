<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ params, fetch, stuff }) => {
		let symbol = params.symbol

		let host = import.meta.env.VITE_PUBLIC_API_URL
		let url = `${host}/financials?type=ratios&symbol=${symbol}&range=annual`

		const res = await fetch(url)
		const data = await res.json()

		return {
			// @ts-ignore
			props: { info: stuff.info, data: data.data }
		}
	}
</script>

<script lang="ts">
	import FinancialTable from '$lib/components/Pages/Financials/_FinancialTable.svelte'
	import { MAP_RATIOS } from '$lib/components/Pages/Financials/maps/map_ratios'

	import type { Info } from '$lib/types/Info'
	import type { FinancialData, Range } from '$lib/components/Pages/Financials/types'

	export let info: Info
	export let data: { data: FinancialData; count: number; range: Range }
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Financial Ratios and Metrics</title>
</svelte:head>

<FinancialTable {info} {data} statement="ratios" range="annual" title="Ratios and Metrics" map={MAP_RATIOS} />
