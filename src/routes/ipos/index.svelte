<script lang="ts">
	import IPONavigation from '$lib/components/IPOs/Navigation/IPONavigation.svelte'
	import RecentNavigation from '$lib/components/IPOs/Navigation/RecentNavigation.svelte'
	import StockTable from '$lib/components/StockTables/StockTable.svelte'
	import SidebarTable from '$lib/components/IPOs/SidebarTable.svelte'
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'
	import NewsWidget from '$lib/components/News/NewsWidget.svelte'

	import type { NewsMinimal } from '$lib/components/News/types'
	import type { TableData, TableQuery } from '$lib/components/StockTables/types'
	import type { SidebarTableProps } from '$lib/components/IPOs/ipo.types'

	export let query: TableQuery
	export let initialData: TableData
	export let getIpoCalendarDataMin: SidebarTableProps
	export let getIpoNewsMin: NewsMinimal[]

	$: data = initialData
</script>

<svelte:head>
	<title>200 Most Recent IPOs</title>
	<meta
		name="description"
		content="Detailed information the last 200 IPOs (initial public offerings) on the stock market. Includes IPO prices, dates, total returns and more."
	/>
	<link rel="canonical" href="https://stockanalysis.com/ipos/" />
</svelte:head>

<h1>Recent IPOs</h1>

<IPONavigation page="recent" />
<div class="page">
	<div>
		<RecentNavigation />

		<StockTable initialQuery={query} initialData={data} />
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

	aside:global {
		@apply flex flex-col space-y-10 pt-6;
	}
</style>
