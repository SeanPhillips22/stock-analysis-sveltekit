<script lang="ts">
	import StockLayout from '$lib/components/StockLayout.svelte'

	import type { Info } from '$lib/types/Info'

	export let data: any
	export let info: Info
</script>

<StockLayout {info}>
	<h1>Profile</h1>
	<div>Profile: {JSON.stringify(data)}</div>
</StockLayout>
