<script lang="ts">
	import SymbolLink from '../SymbolLink.svelte'

	export let tickers: string[]
	export let intro: string | undefined
</script>

{#if intro}
	<span>{intro}:</span>
{/if}
{#each tickers as ticker}
	<SymbolLink symbol={ticker} classes="ticker" />
{/each}
