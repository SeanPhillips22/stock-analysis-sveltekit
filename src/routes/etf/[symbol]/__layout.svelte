<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import StockHead from '$lib/components/StockHead/_StockHead.svelte'

	export const hydrate = false
	export const load: Load = async ({ params, fetch }) => {
		let symbol = params.symbol

		const res = await fetch(`https://api.stockanalysis.com/wp-json/sa/info?s=${symbol}&t=etf`)
		const data = await res.json()

		return {
			props: {
				info: data
			},
			stuff: {
				info: data
			}
		}
	}
</script>

<script lang="ts">
	import type { Info } from '$lib/types/Info'

	export let info: Info
</script>

<main class="contain">
	<StockHead {info} />
	<slot />
</main>
