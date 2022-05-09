<script lang="ts">
	import SelectColumns from '$lib/components/Controls/SelectColumns.svelte'
	import type { DataId } from '$lib/types/DataId'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import { getDataPointsArray } from '../StockDataPoints'
	import type { StockTableConfig, TableState } from '../types'

	export let config: StockTableConfig
	let state: Writable<TableState> = getContext('state')

	let options = config.fixed.columnOptions ?? getDataPointsArray($state.query.index)

	function toggleColumn(id: DataId) {
		let columns = $state.query.columns
		if (columns.includes(id)) {
			columns = columns.filter((c) => c !== id)
		} else {
			columns.push(id)
		}
		$state.query.columns = columns
	}
</script>

<SelectColumns active={$state.query.columns} {options} fixedColumns={config.fixed.fixedColumns} {toggleColumn} />
