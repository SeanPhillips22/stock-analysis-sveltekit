<script lang="ts">
	import IPONavigation from '$lib/components/IPOs/Navigation/IPONavigation.svelte'
	import CalendarNavigation from '$lib/components/IPOs/Navigation/CalendarNavigation.svelte'
	import StockTable from '$lib/components/StockTables/___StockTable.svelte'
	import SidebarTable from '$lib/components/IPOs/SidebarTable.svelte'
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'
	import NewsWidget from '$lib/components/News/NewsWidget.svelte'
	import { FutureIpoDataPoints } from '$lib/components/IPOs/DataPoints/FutureIpoDataPoints'

	import type { NewsMinimal } from '$lib/components/News/types'
	import type { TableData, TableQuery } from '$lib/components/StockTables/types'
	import type { SidebarTableProps } from '$lib/components/IPOs/ipo.types'

	export let query: TableQuery
	export let initialData: TableData
	export let getIposRecentMin: SidebarTableProps
	export let getIpoNewsMin: NewsMinimal[]

	$: data = initialData
</script>

<svelte:head>
	<title>IPO Filings</title>
	<meta
		name="description"
		content="A list of all stocks that have filed for an initial public offering (IPO) on the US stock market, but have not set an estimated IPO date yet."
	/>
	<link rel="canonical" href="https://stockanalysis.com/ipos/filings/" />
</svelte:head>

<h1>IPO Filings</h1>

<IPONavigation page="recent" />
<div class="page">
	<div>
		<CalendarNavigation page="filings" />
		<StockTable
			config={{
				title: `${data.length} Filings`,
				tableId: 'ipos-filings-v2',
				fixed: {
					controls: {
						filter: true,
						export: true,
						columns: true,
						options: true
					},
					columnOptions: FutureIpoDataPoints,
					excludeColumns: ['withdrawnDateFB', 'ipoDate'],
					columnOrder: ['filingDateFB', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
					fixedColumns: ['filingDateFB', 's'],
					screener: {
						type: 'ipo',
						filters: [
							{
								id: 'ipoDate',
								value: 'Unscheduled',
								filterType: 'date'
							}
						],
						sort: [{ id: 'filingDateFB', desc: false }]
					}
				}
			}}
			initialQuery={query}
			initialData={data}
		/>
	</div>

	<aside>
		<SidebarTable title="Upcoming IPOs" btnTitle="Full IPO Calendar" btnUrl="/ipos/calendar/" data={getIposRecentMin} />

		<Sidebar1 />

		<NewsWidget
			title="IPO News"
			news={getIpoNewsMin}
			button={{
				href: '/ipos/news/',
				title: 'More IPO News'
			}}
		/>
	</aside>
</div>

<style type="text/postcss">
	.page {
		@apply lg:grid lg:grid-cols-sidebar lg:gap-x-10;
	}

	aside:global {
		@apply flex flex-col space-y-10 pt-6;
	}
</style>
