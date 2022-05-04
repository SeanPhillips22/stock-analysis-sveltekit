<script lang="ts">
	import type { FinancialsMap } from './types'
	export let row: FinancialsMap
</script>

<div class="wrap">
	<h4>{row.tooltipTitle || row.title}</h4>

	<div class="description">{row.tooltip}</div>

	{#if row.formula}
		<div class="formula">{row.formula}</div>
	{/if}
</div>

<style>
	.wrap {
		@apply min-w-[300px] max-w-md whitespace-normal;
	}

	h4 {
		@apply mb-2 text-xl font-semibold;
	}

	.description {
		@apply border-t border-gray-300 pt-2 wrap font-normal;
	}

	.formula {
		@apply mt-3 border-t border-gray-300 pt-2 text-sm font-normal;
	}
</style>
