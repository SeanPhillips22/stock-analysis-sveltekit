<script lang="ts">
	import SingleNavItem from './SingleNavItem.svelte'
	import MenuNavItem from './MenuNavItem.svelte'

	// Import icons
	import Home from '$lib/icons/Home.svelte'
	import ChartBar from '$lib/icons/ChartBar.svelte'
	import Calendar from '$lib/icons/Calendar.svelte'
	import Collection from '$lib/icons/Collection.svelte'
	import Newspaper from '$lib/icons/Newspaper.svelte'
	import TrendingUp from '$lib/icons/TrendingUp.svelte'
	import ChartSquareBar from '$lib/icons/ChartSquareBar.svelte'
	import Adjustments from '$lib/icons/Adjustments.svelte'
	import Archive from '$lib/icons/Archive.svelte'
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte'
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte'

	const navigation: Navigation = [
		{ name: 'Home', href: '/', icon: Home },
		{
			name: 'Stocks',
			href: '/stocks/',
			icon: ChartBar,
			children: [{ name: 'Stock Lists', href: '/list/' }]
		},
		{
			name: 'IPOs',
			href: '/ipos/',
			icon: Calendar,
			children: [
				{ name: 'Recent IPOs', href: '/ipos/' },
				{
					name: 'IPO Calendar',
					href: '/ipos/calendar/'
				},
				{
					name: 'IPO Statistics',
					href: '/ipos/statistics/'
				},
				{ name: 'IPO News', href: '/ipos/news/' }
			]
		},
		{
			name: 'ETFs',
			href: '/etf/',
			icon: Collection
		},
		{ name: 'News', href: '/news/', icon: Newspaper },
		{
			name: 'Trending',
			href: '/trending/',
			icon: TrendingUp
		},
		{
			name: 'Market Movers',
			href: '/markets/gainers/',
			icon: ChartSquareBar,
			children: [
				{
					name: 'Top Gainers',
					href: '/markets/gainers/'
				},
				{
					name: 'Top Losers',
					href: '/markets/losers/'
				},
				{
					name: 'Most Active',
					href: '/markets/active/'
				},
				{
					name: 'Premarket',
					href: '/markets/premarket/'
				}
			]
		},
		{
			name: 'Screener',
			href: '/screener/stock/',
			icon: Adjustments,
			children: [
				{
					name: 'Stock Screener',
					href: '/screener/stock/'
				},
				{
					name: 'IPO Screener',
					href: '/screener/ipo/'
				},
				{
					name: 'ETF Screener',
					href: '/screener/etf/'
				}
			]
		},
		{
			name: 'Corporate Actions',
			href: '/actions/',
			icon: Archive
		}
	]

	import { page } from '$app/stores'
	$: url = $page.url.pathname.toLowerCase()

	// Get the global state for showing and hiding the navigation
	import { state } from '$lib/stores/navigation'
	// let showNavigation: boolean
	// navigationState.subscribe((value) => {
	// 	showNavigation = value.isOpen
	// })

	/*
	 * Hide the menu on mobile
	 */
	import { clickOutside } from '$lib/functions/ui/clickOutside'
	import type { Navigation } from './types'
	let innerWidth: number // Assign this from window:svelte

	// If screen width is under 1280px, then hide the menu
	function closeNavigation() {
		if (!$state.isOpen && innerWidth && innerWidth < 1280) {
			state.close
		}
	}

	/*
	 * Expanding and collapsing the navigation and/or submenus
	 */
	let collapsed = false
	let stocksExpanded = false
	let iposExpanded = false
	let marketsExpanded = false
	let screenersExpanded = false

	function toggleMenu() {
		collapsed = !collapsed
		stocksExpanded = iposExpanded = marketsExpanded = screenersExpanded = false
	}

	const toggleStocks = () => (stocksExpanded = !stocksExpanded)
	const toggleIPOs = () => (iposExpanded = !iposExpanded)
	const toggleMarkets = () => (marketsExpanded = !marketsExpanded)
	const toggleScreeners = () => (screenersExpanded = !screenersExpanded)
</script>

<svelte:window bind:innerWidth />

<!-- TODO add animations -->
<!-- TODO expand trees on page load -->
<!-- TODO persist state on navigation -->
<!-- TODO active pages and parents should have background color -->

<div class={$state.isOpen ? 'nav show-nav' : 'nav hide-nav'} use:clickOutside={closeNavigation}>
	<div class="nav-col" class:collapsed>
		<nav>
			{#each navigation as item (item.name)}
				{#if item.children}
					<MenuNavItem {item} {collapsed} {url} />
				{:else}
					<SingleNavItem {item} {collapsed} {url} />
				{/if}
			{/each}
		</nav>

		<div class="collapse">
			<div class="nav-item" on:click={toggleMenu}>
				{#if collapsed}
					<ChevronDoubleRight classes="nav-icon" />
				{:else}
					<ChevronDoubleLeft classes="nav-icon" />
				{/if}
				<span class="nav-label">Collapse</span>
			</div>
		</div>
	</div>
</div>

<style type="text/postcss">
	.nav {
		@apply bg-white border-r border-gray-100;
	}

	.show-nav {
		@apply hidden xxl:block;
	}

	.hide-nav {
		@apply block xxl:hidden fixed h-[calc(100%-50px)] xxl:h-0 shadow-2xl xxl:shadow-none;
	}

	.nav-col {
		@apply bg-white top-14 mt-0.5 xxl:sticky px-3 xxl:px-5 py-4;
	}

	nav {
		@apply flex flex-col space-y-1 text-sm font-semibold;
	}

	nav a {
		@apply text-gray-600 flex items-center;
	}

	.collapse {
		@apply mt-4 hidden cursor-pointer items-center border-t border-gray-200 pt-1 xxl:flex;
	}

	.collapse .nav-item {
		@apply p-2;
	}

	.nav-label {
		@apply ml-3;
	}

	.collapsed .nav-label {
		@apply hidden;
	}

	.active {
		@apply bg-blue-50 text-gray-900;
	}

	.nav-item {
		@apply text-sm font-semibold text-gray-600 flex items-center hover:bg-gray-50 hover:text-gray-900 grow rounded-md;
	}

	.nav-item.parent {
		@apply bg-gray-100;
	}
</style>
