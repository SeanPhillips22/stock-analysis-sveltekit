<script context="module">
	export async function load({ params, fetch, stuff }) {
		let symbol = params.symbol

		const res = await fetch(`https://api.stockanalysis.com/wp-json/sa/overview?symbol=${symbol}&t=stocks`)
		const data = await res.json()

		return {
			props: { info: stuff.info, data: data.data.data }
		}
	}
</script>

<script>
	import PriceChart from '$lib/components/Pages/Overview/PriceChart/_PriceChart.svelte'
	import InfoTable from '$lib/components/Pages/Overview/TopTableInfo.svelte'
	import QuoteTable from '$lib/components/Pages/Overview/TopTableQuote.svelte'

	export let info
	export let data
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
