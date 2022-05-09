<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import type { Info } from '$lib/types/Info'
	import type { Forecast } from '$lib/types/Forecast'
	import ConsensusChart from '$lib/components/Forecast/ConsensusChart.svelte'
	import PriceTargetChart from '$lib/components/Forecast/PriceTargetChart.svelte'

	export const load: Load = async ({ params, fetch, stuff }) => {
		let symbol = params.symbol

		const res = await fetch(`https://api.stockanalysis.com/wp-json/sa/fc?symbol=${symbol}`)
		const data = await res.json()

		return {
			props: data
		}
	}
</script>

<script lang="ts">
	// export let info
	// let i = info.info
	export let data: Forecast

	// console.log(datas)
	// console.log(info)
</script>

<h1>Forecast</h1>
<div
	class="rounded-sm border border-gray-200 p-0.5 xs:p-1 md:flex md:flex-col md:gap-y-4 md:divide-y md:p-4 lg:flex-row lg:gap-x-4 lg:divide-y-0 lg:divide-x"
>
	<div class="p-3 md:flex md:p-0 lg:block lg:max-w-[32%]">
		<div>
			<h2 class="mb-1 text-xl font-bold">Stock Price Forecast</h2>
		</div>
		<div>
			<ConsensusChart {data} />
			<PriceTargetChart {data} />
		</div>
	</div>
</div>
