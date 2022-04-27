<script lang="ts">
	import Table from '$lib/components/Tables/Table.svelte'
	import type { TableData } from '$lib/components/Tables/types'
	export let data: TableData
</script>

<h1>All Stock Symbols</h1>

<div class="container">
	<Table
		title={`${data.length} Stocks`}
		{data}
		columns={[
			{
				id: 's',
				title: 'Symbol',
				format: 'symbol'
			},
			{
				id: 'n',
				title: 'Company Name'
			},
			{
				id: 'i',
				title: 'Industry'
			},
			{
				id: 'm',
				title: 'Market',
				format: 'abbreviate'
			}
		]}
		config={{
			sortable: true,
			controls: {
				filter: true,
				export: true
			}
		}}
	/>
</div>

<style type="text/postcss">
	h1 {
		@apply border-b-[3px] border-blue-brand_sharp pb-3 mb-3 sm:mb-4 lg:mb-5;
	}

	.container {
		@apply lg:grid lg:grid-cols-sidebar lg:gap-x-10;
	}
</style>
