<script lang="ts">
	import type { Info } from '$lib/types/Info'
	import { setContext } from 'svelte'

	import StockHead from './StockHead/_StockHead.svelte'
	export let info: Info
	setContext('info', info)
</script>

<main class="contain">
	<StockHead {info} />
	<slot />
</main>
