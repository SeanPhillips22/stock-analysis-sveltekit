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
	<title>Withdrawn IPOs</title>
	<meta
		name="description"
		content="A list of companies that have withdrawn their U.S. stock market IPO within the last year."
	/>
	<link rel="canonical" href="https://stockanalysis.com/ipos/withdrawn/" />
</svelte:head>

<h1>Withdrawn IPOs</h1>

<IPONavigation page="withdrawn" />
<div class="page">
	<div>
		<CalendarNavigation page="withdrawn" />
		<StockTable
			config={{
				title: `${data.length} IPOs`,
				tableId: 'ipos-withdrawn-v2',
				fixed: {
					controls: {
						filter: true,
						export: true,
						columns: true,
						options: true
					},
					columnOptions: FutureIpoDataPoints,
					excludeColumns: ['ipoDate'],
					columnOrder: ['withdrawnDateFB', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
					fixedColumns: ['withdrawnDateFB', 's']
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
