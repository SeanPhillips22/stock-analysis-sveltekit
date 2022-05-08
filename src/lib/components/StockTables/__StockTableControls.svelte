<script lang="ts">
	import TableTitle from './Controls/TableTitle.svelte'
	import type { StockTableConfig } from './types'

	export let config: StockTableConfig
</script>

<div class="controls groups">
	<div class="title-group">
		<TableTitle {config} />
	</div>
</div>
