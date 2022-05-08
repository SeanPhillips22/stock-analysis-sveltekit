<script lang="ts">
	import SelectColumns from '$lib/components/Controls/SelectColumns.svelte'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import { getDataPointsArray } from '../StockDataPoints'
	import type { StockTableConfig, TableQuery } from '../types'

	export let config: StockTableConfig
	let query: Writable<TableQuery> = getContext('query')

	let options = config.fixed.columnOptions ?? getDataPointsArray($query.index)
</script>

<SelectColumns active={$query.columns} {options} fixedColumns={config.fixed.fixedColumns} />
