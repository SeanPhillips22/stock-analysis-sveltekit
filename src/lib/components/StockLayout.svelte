<script lang="ts">
	import type { Info } from '$lib/types/Info'

	import StockHead from './StockHead/_StockHead.svelte'
	export let info: Info
</script>

<main class="contain">
	<StockHead {info} />
	<slot />
</main>
