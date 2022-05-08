<script lang="ts">
	import StockTableFilter from './Controls/StockTableFilter.svelte'

	import TableTitle from './Controls/StockTableTitle.svelte'
	import type { StockTableConfig } from './types'

	export let config: StockTableConfig
	export let filter: string
</script>

<div class="controls groups">
	<div class="title-group">
		<TableTitle {config} />
	</div>

	<div class="btn-group">
		<StockTableFilter bind:filter />
	</div>
</div>
