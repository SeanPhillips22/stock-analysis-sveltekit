<script lang="ts">
	import StockLayout from '$lib/components/StockLayout.svelte'

	import type { Info } from '$lib/types/Info'

	export let data: any
	export let info: Info
</script>

<StockLayout {info}>
	<h1>Dividends</h1>
	<div>Dividends: {JSON.stringify(data)}</div>
</StockLayout>
