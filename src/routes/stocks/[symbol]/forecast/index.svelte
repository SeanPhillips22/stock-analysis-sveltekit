<script lang="ts">
	import StockLayout from '$lib/components/StockLayout.svelte'

	import type { Info } from '$lib/types/Info'

	export let data: any
	export let info: Info
</script>

<StockLayout state={{ info, data }}>
	<h1>Forecast</h1>
	<div>Forecast: {JSON.stringify(data)}</div>
</StockLayout>
