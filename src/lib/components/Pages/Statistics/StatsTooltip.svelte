<script lang="ts">
	export let tooltip: {
		title: string
		tooltip: string
		formula?: string
	}
</script>

<h4>{tooltip.title}</h4>

<p>{tooltip.tooltip}</p>

{#if tooltip.formula}
	<div>{tooltip.formula}</div>
{/if}

<style type="text/postcss">
	h4 {
		@apply mb-2 text-xl font-semibold;
	}

	p {
		@apply border-t border-gray-300 pt-2;
	}

	div {
		@apply mt-3 border-t border-gray-300 pt-2 text-sm;
	}
</style>
