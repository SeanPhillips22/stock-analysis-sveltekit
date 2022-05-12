<script lang="ts">
	import IPONavigation from '$lib/components/IPOs/Navigation/IPONavigation.svelte'
	import StatsChartAnnual from '$lib/components/IPOs/Charts/StatsChartAnnual.svelte'
	import StatsChartMonthly from '$lib/components/IPOs/Charts/StatsChartMonthly.svelte'
	import SidebarTable from '$lib/components/IPOs/SidebarTable.svelte'
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'

	import type { SidebarTableProps } from '$lib/components/IPOs/ipo.types'
	import type { NewsMinimal } from '$lib/components/News/types'
	import NewsWidget from '$lib/components/News/NewsWidget.svelte'

	export let data: {
		total: number
		year2022: number
		months2019: [string, number][]
		months2020: [string, number][]
		months2021: [string, number][]
		months2022: [string, number][]
	}
	export let news: NewsMinimal[]
	export let recent: SidebarTableProps
</script>

<svelte:head>
	<title>IPO Statistics and Charts</title>
	<meta
		name="description"
		content="Statistics and charts for initial public offerings (IPOs) on the US stock market. Annual data is available from 2000-2022 and monthly data for 2019-2022."
	/>
	<link rel="canonical" href="https://stockanalysis.com/ipos/statistics/" />
</svelte:head>

<h1>IPO Statistics</h1>

<IPONavigation page="statistics" />

<div class="page">
	<div class="flex flex-col space-y-3 py-3 sm:py-4">
		<div>
			<p>
				This page contains statistics and charts for initial public offerings (IPOs) on the US stock market. Annual data
				is available from 2000-2022 and monthly data since 2019.
			</p>
		</div>
		<div>
			<h2>Number of IPOs by Year</h2>
			<p>
				There have been {data.total.toLocaleString('en-US')} IPOs between 2000 and 2022. The least was in 2009 with only
				62. The full year 2021 was an all-time record with 1035 IPOs, beating the previous record of 480 in the year 2020.
			</p>
			<StatsChartAnnual title="Annual IPOs, 2000-2022" data={data.year2022} />
		</div>
		<div>
			<h2>2022 Initial Public Offerings</h2>
			<p>
				There have been {data.year2022} IPOs so far in 2022.
				<a href="/ipos/2022/" sveltekit:prefetch>View all 2022 IPOs.</a>
			</p>
			<StatsChartMonthly title="2022 IPOs" data={data.months2022} />
		</div>
		<div>
			<h2>2021 Initial Public Offerings</h2>
			<p>
				There were 1035 IPOs in 2021, which was an all-time record. March had the most with a total of 151, while August
				had the fewest with only 40 IPOs. <a href="/ipos/2021/" sveltekit:prefetch>View all 2021 IPOs.</a>
			</p>
			<StatsChartMonthly title="2021 IPOs" data={data.months2021} />
		</div>
		<div>
			<h2>2020 Initial Public Offerings</h2>
			<p>
				There were 480 initial public offerings in 2020. October had the most with a total of 97 IPOs. March had the
				fewest with only 5. <a href="/ipos/2020/" sveltekit:prefetch>View all 2020 IPOs.</a>
			</p>
			<StatsChartMonthly title="2020 IPOs" data={data.months2020} />
		</div>
		<div>
			<h2>2019 Initial Public Offerings</h2>
			<p>
				There were 232 IPOs in 2019. May and July had the most with a total of 30. January had the fewest, with only 7. <a
					href="/ipos/2019/"
					sveltekit:prefetch>View all 2019 IPOs.</a
				>
			</p>
			<StatsChartMonthly title="2019 IPOs" data={data.months2019} />
		</div>
	</div>

	<aside>
		<SidebarTable title="Latest IPOs" btnTitle="All Recent IPOs" btnUrl="/ipos/" data={recent} />

		<Sidebar1 />

		<NewsWidget
			title="IPO News"
			{news}
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

	h2 {
		@apply mb-2;
	}

	p {
		@apply text-base text-gray-900 sm:text-lg;
	}

	aside:global {
		@apply flex flex-col space-y-10 pt-6;
	}
</style>
