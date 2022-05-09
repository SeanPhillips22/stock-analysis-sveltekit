<script lang="ts">
	import IPONavigation from '$lib/components/IPOs/Navigation/IPONavigation.svelte'
	import RecentNavigation from '$lib/components/IPOs/Navigation/RecentNavigation.svelte'
	import InfoBox from '$lib/components/Alerts/InfoBox.svelte'
	import StockTable from '$lib/components/StockTables/__StockTableBody.svelte'
	import SidebarTable from '$lib/components/IPOs/SidebarTable.svelte'
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'
	import NewsWidget from '$lib/components/News/NewsWidget.svelte'
	import { RecentIpoDataPoints } from '$lib/components/IPOs/DataPoints/RecentIpoDataPoints'

	import type { NewsMinimal } from '$lib/components/News/types'
	import type { TableData, TableQuery } from '$lib/components/StockTables/types'
	import type { SidebarTableProps } from '$lib/components/IPOs/ipo.types'

	export let query: TableQuery
	export let initialData: TableData
	export let getIpoCalendarDataMin: SidebarTableProps
	export let getIpoNewsMin: NewsMinimal[]
	export let year: '2022' | '2021' | '2020' | '2019'
	export let info: string

	$: data = initialData

	const description =
		year === '2022'
			? 'A list of all the stocks that have gone public with an IPO on the US stock market in the year 2022, so far.'
			: `A list of all the initial public offerings (IPOs) on the US stock market in the year ${year}. Includes detailed information about each stock.`
</script>

<svelte:head>
	<title>{year === '2022' ? 'All 2022 IPOs (so far)' : `All ${year} IPOs - A Complete List`}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://stockanalysis.com/ipos/{year}/" />
</svelte:head>

<h1>All {year} IPOs</h1>

<IPONavigation page="recent" />
<div class="page">
	<div>
		<RecentNavigation {year} />

		<div class="info-wrap">
			<InfoBox text={info} />
		</div>

		<StockTable
			config={{
				tableId: 'ipos-' + year,
				title: data.length + ' IPOs',
				fixed: {
					controls: {
						filter: true,
						export: true,
						columns: true,
						options: true
					},
					columnOptions: RecentIpoDataPoints,
					columnOrder: ['ipoDate', 's', 'n', 'ipp', 'ippc', 'ipr'],
					fixedColumns: ['ipoDate', 's'],
					screener: {
						type: 'stocks',
						filters: [{ id: 'ipoDate', name: `Year ${year}`, value: `year-${year}`, filterType: 'date' }]
					}
				}
			}}
			initialQuery={query}
			initialData={data}
		/>
	</div>

	<aside>
		<SidebarTable
			title="Upcoming IPOs"
			btnTitle="Full IPO Calendar"
			btnUrl="/ipos/calendar/"
			data={getIpoCalendarDataMin}
		/>

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

	.info-wrap {
		@apply mt-4 mb-2 lg:mb-3;
	}

	aside:global {
		@apply flex flex-col space-y-10 pt-6;
	}
</style>
