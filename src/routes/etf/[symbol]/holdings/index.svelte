<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"
	
	export const load: Load = async({ params, fetch, stuff }) => {
		let symbol = params.symbol

		const res = await fetch(`https://api.stockanalysis.com/wp-json/sa/dividend?symbol=${symbol}`)
		const data = await res.json()

		return {
			props: { info: stuff, data }
		}
	}
</script>

<script lang="ts">
	// export let info
	// let i = info.info
	export let data: any
</script>

<h1>Dividends</h1>

<div>Dividends: {JSON.stringify(data)}</div>
