<script lang="ts">
	import NewsFeed from '$lib/components/News/_NewsFeed.svelte'
	import IPONavigation from '$lib/components/IPOs/Navigation/IPONavigation.svelte'
	import SidebarTable from '$lib/components/IPOs/SidebarTable.svelte'
	import Sidebar1 from '$lib/components/Ads/AdSense/Sidebar1.svelte'

	import type { SidebarTableProps } from '$lib/components/IPOs/ipo.types'
	import type { NewsArray } from '$lib/components/News/types'

	export let data: NewsArray
	export let upcoming: SidebarTableProps
	export let recent: SidebarTableProps
</script>

<svelte:head>
	<title>Latest IPO News</title>
	<meta
		name="description"
		content="The latest news about initial public offerings (IPOs) on the stock market, including both recent and upcoming IPOs."
	/>
	<link rel="canonical" href="https://stockanalysis.com/ipos/news/" />
</svelte:head>

<h1>IPO News</h1>

<IPONavigation page="news" />

<div class="page">
	<NewsFeed news={data} related="Stocks" />

	<aside>
		<SidebarTable title="Upcoming IPOs" btnTitle="Full IPO Calendar" btnUrl="/ipos/calendar/" data={upcoming} />
		<Sidebar1 />
		<SidebarTable title="Latest IPOs" btnTitle="All Recent IPOs" btnUrl="/ipos/" data={recent} />
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
