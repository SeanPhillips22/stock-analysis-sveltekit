<script context="module">
	export async function load({ params, fetch, stuff }) {
		let symbol = params.symbol

		const res = await fetch(
			`https://api.stockanalysis.com/wp-json/sa/financials?type=income-statement&symbol=${symbol}&range=annual`
		)
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

<svelte:head>
	<title>{i.nameFull} ({i.ticker}) Financial Statements: Income</title>
</svelte:head>

<h1>Financials</h1>

<div>Financials: {JSON.stringify(data)}</div>
