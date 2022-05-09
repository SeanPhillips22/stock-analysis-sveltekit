<script lang="ts">
	import StockHead from './StockHead/_StockHead.svelte'
	import type { Info } from '$lib/types/Info'

	type T = $$Generic
	export let state: { info: Info; data?: T }

	// Pass the page info into context
	import { info } from '$lib/stores/infoStore'
	$: $info = state.info

	// Pass the page data into context
	import { data } from '$lib/stores/dataStore'
	$: $data = state.data
</script>

<main class="contain">
	<StockHead />
	<slot />
</main>
