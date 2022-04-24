<script context="module">
	import StockHead from '$lib/components/StockHead/_StockHead.svelte'

	export const hydrate = false
	export async function load({ params, fetch }) {
		let symbol = params.symbol

		const res = await fetch(`https://api.stockanalysis.com/wp-json/sa/info?s=${symbol}&t=stocks`)
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

<script>
	export let info
</script>

<StockHead {info} />

<div class="stock-content">
	<slot />
</div>

<style>
</style>
