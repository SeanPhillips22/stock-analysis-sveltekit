<script context="module">
	export async function load({ params, fetch, stuff }) {
		let symbol = params.symbol

		const res = await fetch(`https://api.stockanalysis.com/wp-json/sa/chartpage?symbol=${symbol}`)
		const data = await res.json()

		return {
			props: { info: stuff, data }
		}
	}
</script>

<script>
	export let info
	let i = info.info
	export let data
</script>

<h1>Chart</h1>

<div>Chart: {JSON.stringify(data)}</div>
