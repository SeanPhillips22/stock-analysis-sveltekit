<script lang="ts">
	import StockTableFilter from './Controls/StockTableFilter.svelte'

	import TableTitle from './Controls/StockTableTitle.svelte'
	import type { StockTableConfig } from './types'

	export let config: StockTableConfig
	export let data: any

	// Get the active user, if any
	import { user } from '$lib/auth/userStore'

	import Export from '../Controls/Export.svelte'
	import ExportPro from '../Controls/ExportPro.svelte'
	import StockTableColumns from './Controls/StockTableColumns.svelte'
</script>

<div class="controls groups">
	<div class="title-group">
		<TableTitle {config} />
	</div>

	<div class="btn-group">
		<StockTableFilter />

		{#if !$user?.isPro}
			<Export />
		{:else}
			<ExportPro {data} />
		{/if}

		{#if config.fixed.controls?.columns}
			<StockTableColumns {config} />
		{/if}
	</div>
</div>
