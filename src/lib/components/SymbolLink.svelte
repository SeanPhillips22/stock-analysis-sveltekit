<script lang="ts">
	export let symbol: string
	export let classes: string | null = null
</script>

{#if symbol.substring(0, 1) === '$'}
	<a href="/stocks/{symbol.slice(1).toLowerCase()}/" class={classes} sveltekit:prefetch>{symbol.slice(1)}</a>
{:else if symbol.substring(0, 1) === '#'}
	<a href="/etf/{symbol.slice(1).toLowerCase()}/" class={classes} sveltekit:prefetch>{symbol.slice(1)}</a>
{:else}
	{symbol.slice(1)}
{/if}
