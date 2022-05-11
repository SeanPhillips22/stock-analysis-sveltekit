<script lang="ts">
	import Dropdown from '../Dropdown/_Dropdown.svelte'
	import { DataPoints } from '../StockTables/StockDataPoints'
	import type { DataPointType } from '../StockTables/StockDataPoints'
	import type { DataId } from '$lib/types/DataId'
	import SelectItem from './SelectItem.svelte'

	export let active: DataId[]
	export let options: DataId[]
	export let fixedColumns: DataId[] | undefined
	export let toggleColumn: (id: DataId) => void

	let search = ''
	let _fixed: DataPointType[] = []
	let _active: DataPointType[] = []
	let _inactive: DataPointType[] = []

	options.forEach((item) => {
		let { id, name } = DataPoints[item]
		if (fixedColumns?.includes(item)) _fixed = [..._fixed, { id, name }] // _fixed.push({ id, name })
		else if (active.includes(item)) _active = [..._active, { id, name }] // _active.push({ id, name })
		else _inactive = [..._inactive, { id, name }] // _inactive.push({ id, name })
	})

	let activeItems: DataPointType[]
	let inactiveItems: DataPointType[]
	$: {
		if (search && search !== '') {
			activeItems = _active.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
			inactiveItems = _inactive.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
		} else {
			activeItems = _active
			inactiveItems = _inactive
		}
	}
</script>

<Dropdown title="Columns" interactive wide>
	<!-- svelte-ignore a11y-autofocus -->
	<input type="text" class="search" autofocus bind:value={search} />
	<div class="column-list">
		{#each _fixed as { id, name }}
			<SelectItem {id} {name} checked={true} fixed={true} {toggleColumn} />
		{/each}
		{#each activeItems as { id, name }}
			<SelectItem {id} {name} checked={true} {toggleColumn} />
		{/each}
		{#each inactiveItems as { id, name }}
			<SelectItem {id} {name} checked={false} {toggleColumn} />
		{/each}
	</div>
</Dropdown>

<style>
	.search {
		@apply w-full border-0 border-b border-gray-200 focus:border-gray-200 focus:ring-0;
	}

	.column-list:global {
		@apply max-h-80 space-y-2 overflow-y-auto overscroll-contain p-2 text-sm;
		scrollbar-width: thin;
		scrollbar-color: #bbb #fff;
	}

	.column-list::-webkit-scrollbar {
		width: 7px; /* width of the entire scrollbar */
	}

	.column-list::-webkit-scrollbar-track {
		background: #fff; /* color of the tracking area */
	}

	.column-list::-webkit-scrollbar-thumb {
		background-color: #bbb; /* color of the scroll thumb */
		border-radius: 0; /* roundness of the scroll thumb */
	}
</style>
