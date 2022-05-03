<script lang="ts">
	import type { TableConfig } from './types'
	import Filter from './Controls/Filter.svelte'
	import Export from './Controls/Export.svelte'

	export let config: TableConfig
	export let filter: string
	export let data: any | undefined = undefined
</script>

{#if config.controls}
	<div class="wrap">
		{#if config.controls.export}
			<Export {data} />
		{/if}

		{#if config.controls.filter}
			<Filter bind:filter />
		{/if}
	</div>
{/if}

<style type="text/postcss">
	.wrap {
		@apply flex gap-x-2;
	}
</style>
