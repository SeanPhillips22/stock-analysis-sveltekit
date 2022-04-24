<script>
	import { page } from '$app/stores'

	// Get the global state for showing and hiding the navigation
	import { navigationOpen } from '$lib/stores/navigation'
	let showNavigation
	navigationOpen.subscribe((value) => {
		showNavigation = value
	})

	// Import icons
	import Home from '$lib/icons/Home.svelte'
	import ChartBar from '$lib/icons/ChartBar.svelte'
	import NavArrow from '$lib/icons/NavArrow.svelte'
	import Calendar from '$lib/icons/Calendar.svelte'
	import Collection from '$lib/icons/Collection.svelte'
	import Newspaper from '$lib/icons/Newspaper.svelte'
	import TrendingUp from '$lib/icons/TrendingUp.svelte'
	import ChartSquareBar from '$lib/icons/ChartSquareBar.svelte'
	import Adjustments from '$lib/icons/Adjustments.svelte'
	import Archive from '$lib/icons/Archive.svelte'
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte'
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte'

	// Functionality for expanding and collapsing menu
	let menuExpanded = true
	function toggleMenu() {
		menuExpanded = !menuExpanded
	}

	// Functionality for expanding and collapsing submenus
	let stocksExpanded = false
	let iposExpanded = false
	let marketsExpanded = false
	let screenersExpanded = false
	const toggleStocks = () => (stocksExpanded = !stocksExpanded)
	const toggleIPOs = () => (iposExpanded = !iposExpanded)
	const toggleMarkets = () => (marketsExpanded = !marketsExpanded)
	const toggleScreeners = () => (screenersExpanded = !screenersExpanded)
</script>

<div class={showNavigation ? 'nav show-nav' : 'nav hide-nav'}>
	<div class={!menuExpanded ? 'collapsed nav-col' : 'nav-col'}>
		<nav>
			<div class="nav-item" class:active={$page.url.pathname === '/'}>
				<a href="/" title="Home">
					<Home classes="nav-icon" />
					<span class="nav-label">Home</span>
				</a>
			</div>

			<div>
				<div class="nav-item" class:active={$page.url.pathname === '/stocks/'} on:click={toggleStocks}>
					<a href="/stocks/" title="Stocks">
						<ChartBar classes="nav-icon" />
						<span class="nav-label">Stocks</span>
					</a>
					<div class="arrow-wrap">
						<NavArrow classes={stocksExpanded ? 'nav-arrow open' : 'nav-arrow closed'} />
					</div>
				</div>
				<div class={stocksExpanded ? 'block' : 'hidden'}>
					<div class="subitem"><a href="/list/" title="Stock Lists">Stock Lists</a></div>
				</div>
			</div>

			<div>
				<div class="nav-item" on:click={toggleIPOs}>
					<a href="/ipos/" title="IPOs">
						<Calendar classes="nav-icon" />
						<span class="nav-label">IPOs</span>
					</a>
					<div class="arrow-wrap">
						<NavArrow classes={iposExpanded ? 'nav-arrow open' : 'nav-arrow closed'} />
					</div>
				</div>
				<div class={iposExpanded ? 'block' : 'hidden'}>
					<ul>
						<li class="subitem"><a href="/ipos/" title="Recent IPOs">Recent IPOs</a></li>
						<li class="subitem"><a href="/ipos/calendar/" title="IPO Calendar">IPO Calendar</a></li>
						<li class="subitem"><a href="/ipos/statistics/" title="IPO Statistics">IPO Statistics</a></li>
						<li class="subitem"><a href="/ipos/news/" title="IPO News">IPO News</a></li>
					</ul>
				</div>
			</div>

			<div class="nav-item">
				<a href="/etf/" title="ETFs">
					<Collection classes="nav-icon" />
					<span class="nav-label">ETFs</span>
				</a>
			</div>

			<div class="nav-item">
				<a href="/news/" title="News">
					<Newspaper classes="nav-icon" />
					<span class="nav-label">News</span>
				</a>
			</div>

			<div class="nav-item">
				<a href="/trending/" title="Trending">
					<TrendingUp classes="nav-icon" />
					<span class="nav-label">Trending</span>
				</a>
			</div>

			<div>
				<div class="nav-item" on:click={toggleMarkets}>
					<a href="/markets/" title="Market Movers">
						<ChartSquareBar classes="nav-icon" />
						<span class="nav-label">Market Movers</span>
					</a>
					<div class="arrow-wrap">
						<NavArrow classes={marketsExpanded ? 'nav-arrow open' : 'nav-arrow closed'} />
					</div>
				</div>
				<div class={marketsExpanded ? 'block' : 'hidden'}>
					<ul>
						<li class="subitem"><a href="/markets/gainers/" title="Top Gainers">Top Gainers</a></li>
						<li class="subitem"><a href="/markets/losers/" title="Top Losers">Top Losers</a></li>
						<li class="subitem"><a href="/markets/active/" title="Most Active">Most Active</a></li>
						<li class="subitem"><a href="/markets/premarket/" title="Premarket">Premarket</a></li>
					</ul>
				</div>
			</div>

			<div>
				<div class="nav-item" on:click={toggleScreeners}>
					<a href="/screener/stock/" title="Screener">
						<Adjustments classes="nav-icon" />
						<span class="nav-label">Screener</span>
					</a>
					<div class="arrow-wrap">
						<NavArrow classes={screenersExpanded ? 'nav-arrow open' : 'nav-arrow closed'} />
					</div>
				</div>
				<div class={screenersExpanded ? 'block' : 'hidden'}>
					<ul>
						<li class="subitem"><a href="/screener/stock/" title="Stock Screener">Stock Screener</a></li>
						<li class="subitem"><a href="/screener/ipo/" title="IPO Screener">IPO Screener</a></li>
						<li class="subitem"><a href="/screener/etf/" title="ETF Screener">ETF Screener</a></li>
					</ul>
				</div>
			</div>

			<div class="nav-item">
				<a href="/actions/" title="Corporate Actions">
					<Archive classes="nav-icon" />
					<span class="nav-label">Corporate Actions</span>
				</a>
			</div>
		</nav>

		<div class="collapse">
			<div class="nav-item" on:click={toggleMenu}>
				{#if menuExpanded}
					<ChevronDoubleLeft classes="nav-icon" />
					Collapse
				{:else}
					<ChevronDoubleRight classes="nav-icon" />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
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
		@apply bg-white top-16 xxl:sticky px-3 xxl:px-5 py-4;
	}

	nav {
		@apply flex flex-col space-y-1 text-sm font-semibold;
	}

	nav a {
		@apply text-gray-600 flex items-center;
	}

	.nav-item {
		@apply text-sm font-semibold text-gray-600 flex items-center hover:bg-gray-50 hover:text-gray-900 grow rounded-md;
	}

	.nav-item a {
		@apply px-2 py-2 flex grow;
	}

	.subitem {
		@apply py-1.5 pl-11 pr-2;
	}

	.collapse {
		@apply flex border-t border-gray-200 mt-4 items-center cursor-pointer;
	}

	.nav-label {
		@apply ml-3;
	}

	.collapsed .nav-label {
		@apply hidden;
	}

	.nav-item.active {
		@apply bg-blue-50 text-gray-900;
	}
</style>
