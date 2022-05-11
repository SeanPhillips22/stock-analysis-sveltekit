<script lang="ts">
	import IPONavigation from '$lib/components/IPOs/Navigation/IPONavigation.svelte'
	import CalendarNavigation from '$lib/components/IPOs/Navigation/CalendarNavigation.svelte'
	import StockTable from '$lib/components/StockTables/___StockTable.svelte'
	import SidebarTable from '$lib/components/IPOs/SidebarTable.svelte'
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'
	import LaterExplanation from '$lib/components/IPOs/LaterExplanation.svelte'
	import IPOSources from '$lib/components/IPOs/IPOSources.svelte'

	import { FutureIpoDataPoints } from '$lib/components/IPOs/DataPoints/FutureIpoDataPoints'
	import type { TableData, TableQuery } from '$lib/components/StockTables/types'
	import type { SidebarTableProps } from '$lib/components/IPOs/ipo.types'

	export let query: TableQuery
	export let initialData: TableData
	export let getIposRecentMin: SidebarTableProps
	export let getIpoFilingsMin: SidebarTableProps
	export let getFilingsCount: number
	export let laterQuery: TableQuery
	export let laterData: TableData

	$: data = initialData
</script>

<svelte:head>
	<title>IPO Calendar - All Upcoming IPOs</title>
	<meta
		name="description"
		content="An IPO calendar with all upcoming initial public offerings (IPOs) on the stock market. Includes IPO dates, prices, how many shares are offered and more."
	/>
	<link rel="canonical" href="https://stockanalysis.com/ipos/calendar/" />
</svelte:head>

<h1>IPO Calendar</h1>

<IPONavigation page="calendar" />
<div class="page">
	<div>
		<CalendarNavigation page="calendar" />
		<div class="inner">
			<div>
				{#if data.length}
					<StockTable
						config={{
							title: `This Week · ${data.length} IPOs`,
							tableId: 'ipo-calendar-v2',
							fixed: {
								controls: {
									filter: true,
									export: true,
									columns: true,
									options: true
								},
								columnOptions: FutureIpoDataPoints,
								excludeColumns: ['withdrawnDateFB'],
								columnOrder: ['ipoDate', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
								fixedColumns: ['ipoDate', 's'],
								screener: {
									type: 'ipo',
									filters: [
										{
											id: 'ipoDate',
											value: 'This Week',
											filterType: 'date'
										}
									],
									sort: [{ id: 'ipoDate', desc: false }]
								}
							}
						}}
						initialQuery={query}
						initialData={data}
					/>
				{:else}
					<h2>This Week · 0 IPOs</h2>
					<p>There are no upcoming IPOs remaining for this week.</p>
				{/if}
			</div>
			<div>
				{#if laterData?.length}
					<StockTable
						config={{
							title: `Next Week · ${laterData?.length} IPOs`,
							tableId: 'ipo-calendar-later-v2',
							fixed: {
								controls: {
									filter: true,
									export: true,
									columns: true,
									options: true
								},
								columnOptions: FutureIpoDataPoints,
								excludeColumns: ['withdrawnDateFB'],
								columnOrder: ['ipoDate', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
								fixedColumns: ['ipoDate', 's'],
								screener: {
									type: 'ipo',
									filters: [
										{
											id: 'ipoDate',
											value: 'This Week',
											filterType: 'date'
										}
									],
									sort: [{ id: 'ipoDate', desc: false }]
								}
							}
						}}
						initialQuery={laterQuery}
						initialData={laterData}
					/>
				{:else}
					<h2>Next Week · 0 IPOs</h2>
					<p>There are no IPOs scheduled for next week.</p>
				{/if}
			</div>
			<LaterExplanation />
			<IPOSources />
		</div>
	</div>

	<aside>
		<SidebarTable title="Latest IPOs" btnTitle="All Recent IPOs" btnUrl="/ipos/" data={getIposRecentMin} />

		<Sidebar1 />

		<SidebarTable
			title="Unscheduled IPOs ({getFilingsCount})"
			btnTitle="All IPO Filings"
			btnUrl="/ipos/filings/"
			data={getIpoFilingsMin}
			filed={true}
		/>
	</aside>
</div>

<style type="text/postcss">
	.page {
		@apply lg:grid lg:grid-cols-sidebar lg:gap-x-10;
	}

	.inner:global {
		@apply flex flex-col space-y-4 xs:space-y-5 sm:space-y-7;
	}

	h2 {
		@apply mb-2 font-semibold;
	}

	p {
		@apply text-lg;
	}

	aside:global {
		@apply flex flex-col space-y-10 pt-6;
	}
</style>
