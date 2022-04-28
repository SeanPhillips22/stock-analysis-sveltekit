<script lang="ts">
	export let tickers: string[]
	export let intro: string | undefined
</script>

{#if intro}
	<span>{intro}:</span>
{/if}
{#each tickers as ticker}
	{#if ticker.substring(0, 1) === '$'}
		<a href="/stocks/{ticker.slice(1).toLowerCase()}/" class="ticker" sveltekit:prefetch>{ticker.slice(1)}</a>
	{:else if ticker.substring(0, 1) === '#'}
		<a href="/etf/{ticker.slice(1).toLowerCase()}/" class="ticker" sveltekit:prefetch>{ticker.slice(1)}</a>
	{/if}
{/each}

<style>
	.ticker {
		@apply ml-1 mb-1 inline-flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 text-sm font-medium hover:bg-gray-200 sm:ml-1.5;
	}
</style>
