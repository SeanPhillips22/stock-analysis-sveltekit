<script lang="ts">
	import StockLayout from '$lib/components/StockLayout.svelte'

	import type { Info } from '$lib/types/Info'

	export let info: Info
</script>

<StockLayout state={{ info }}>
	<h1>Chart</h1>
	<div>Chart: {JSON.stringify(info)}</div>
</StockLayout>
