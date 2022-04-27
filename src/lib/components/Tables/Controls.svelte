<script lang="ts">
	import type { TableConfig } from './types'
	import Filter from './Controls/Filter.svelte'
	import Export from './Controls/Export.svelte'

	export let config: TableConfig
</script>

{#if config.controls}
	<div class="wrap">
		{#if config.controls.export}
			<Export />
		{/if}

		{#if config.controls.filter}
			<Filter />
		{/if}
	</div>
{/if}

<style>
	.wrap {
		@apply flex gap-x-2;
	}
</style>
