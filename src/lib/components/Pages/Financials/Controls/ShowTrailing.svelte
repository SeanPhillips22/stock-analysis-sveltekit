<script lang="ts">
	import { state } from '$lib/stores/financialsStore'
	import type { Range, Statement } from '../types'

	export let range: Range
	export let statement: Statement
</script>

{#if range === 'annual' && statement !== 'ratios'}
	<button class="controls-btn" class:active={$state.showTTM} on:click={() => ($state.showTTM = !$state.showTTM)}
		>TTM</button
	>
{:else if statement === 'ratios'}
	<button
		class="controls-btn"
		class:active={$state.showCurrent}
		on:click={() => ($state.showCurrent = !$state.showCurrent)}>Current</button
	>
{/if}
