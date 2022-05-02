<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/_Sidebar.svelte'

	import Table from '$lib/components/Tables/SimpleTable.svelte'
	import type { TableData } from '$lib/components/Tables/types'
	export let data: TableData
</script>

<svelte:head>
	<title>List of All Stock Ticker Symbols</title>
	<meta
		name="description"
		content="An overview of all the stock ticker symbols listed. Explore the stock pages to learn about the company's price history, financials, key stats, and more."
	/>
	<link rel="canonical" href="https://stockanalysis.com/stocks/" />
</svelte:head>

<main class="contain">
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
					title: 'Market Cap',
					format: 'abbreviate'
				}
			]}
			config={{
				sortable: true,
				pagination: {
					enabled: true,
					perPage: 500,
					pageOptions: [{ option: 500 }, { option: 1000 }, { option: 10000, title: 'Show All', proOnly: true }]
				},
				controls: {
					filter: true,
					export: true
				}
			}}
		/>

		<Sidebar />
	</div>
</main>

<style type="text/postcss">
	h1 {
		@apply border-b-[3px] border-blue-brand_sharp pb-3 mb-3 sm:mb-4 lg:mb-5;
	}

	.container {
		@apply lg:grid lg:grid-cols-sidebar lg:gap-x-10;
	}
</style>
