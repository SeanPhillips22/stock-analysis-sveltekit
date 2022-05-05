<script lang="ts">
	import type { Range, Statement } from '../types'

	export let range: Range
	export let statement: Statement
</script>

{#if range === 'annual' && statement !== 'ratios'}
	<button class="controls-btn">TTM</button>
{:else if statement === 'ratios'}
	<button class="controls-btn">Current</button>
{/if}
