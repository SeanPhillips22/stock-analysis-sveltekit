<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ params, fetch, stuff }) => {
		let symbol = params.symbol

		const res = await fetch(`https://api.stockanalysis.com/wp-json/sa/overview?symbol=${symbol}&t=stocks`)
		const data = await res.json()

		return {
			props: { stuff, data: data.data.data }
		}
	}
</script>

<script lang="ts">
	import type { Info } from '$lib/types/Info'
	import PriceChart from '$lib/components/Pages/Overview/PriceChart/_PriceChart.svelte'
	import InfoTable from '$lib/components/Pages/Overview/TopTableInfo.svelte'
	import QuoteTable from '$lib/components/Pages/Overview/TopTableQuote.svelte'

	export let stuff
	let info: Info = stuff.info
	export let data: any
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Stock Price, Quote & News</title>
</svelte:head>

<div class="mt-4 flex-row gap-4 lg:flex">
	<div class="order-3 grow overflow-auto">
		<PriceChart {info} />
	</div>
	<div class="order-1 flex flex-row gap-4">
		<InfoTable {data} />
		<QuoteTable {data} {info} />
	</div>
</div>
