<script>
	import Table from '$lib/components/Tables/SimpleTable.svelte'
	export let data
</script>

<h1>All Stock Symbols</h1>

<div class="container">
	<Table
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
	/>
</div>

<style>
	h1 {
		@apply border-b-[3px] border-blue-brand_sharp pb-3 mb-3 sm:mb-4 lg:mb-5;
	}

	.container {
		@apply lg:grid lg:grid-cols-sidebar lg:gap-x-10;
	}
</style>
