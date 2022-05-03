<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ params, fetch, stuff }) => {
		let symbol = params.symbol
		let range = params.range

		if (range === 'quarterly' || range === 'trailing') {
			let url = `https://api.stockanalysis.com/wp-json/sa/financials?type=income-statement&symbol=${symbol}&range=${range}`

			const res = await fetch(url)
			const data = await res.json()

			return {
				props: { info: stuff, data, range }
			}
		}

		return {
			status: 404,
			error: 'Not Found'
		}
	}
</script>

<script lang="ts">
	import { capitalize } from '$lib/functions/utils/capitalize'
	import FinancialsNavigation from '$lib/components/Pages/Financials/FinancialsNavigation.svelte'

	export let info
	export let data: any
	export let range: 'quarterly' | 'trailing'

	let i = info.info
</script>

<svelte:head>
	<title>{i.nameFull} ({i.ticker}) Financial Statements: Income</title>
</svelte:head>

<FinancialsNavigation info={i} statement="income" period={range} />

<h1>Income Statement ({capitalize(range)})</h1>

<div>Financials: {JSON.stringify(data)}</div>

<style>
	h1 {
		@apply mb-1 text-[1.3rem] font-bold bp:text-2xl md:mb-3;
	}
</style>
