<script lang="ts">
	import ArrowCTA from '$lib/icons/ArrowCTA.svelte'
	import Sidebar1 from '../Ads/AdSense/Sidebar1.svelte'

	export let list: string[] = ['pro', 'ipoCalendar', 'stockScreener', 'marketMovers']

	const Features: any = {
		pro: {
			title: 'Stock Analysis Pro',
			description: 'Unlimited access to all our financial data with up to 30 years of history.',
			url: '/pro/',
			tagId: 'tag-upgr-nav-widget'
		},
		ipoCalendar: {
			title: 'IPO Calendar',
			description: 'All upcoming IPOs on the stock market with detailed statistics and financials.',
			url: '/ipos/calendar/',
			tagId: 'tag-feat-nav-widget-calendar'
		},
		stockScreener: {
			title: 'Stock Screener',
			description: 'Filter, sort and analyze all stocks to find your next investment.',
			url: '/screener/stock/',
			tagId: 'tag-feat-nav-widget-screener'
		},
		etfScreener: {
			title: 'ETF Screener',
			description: 'Filter, sort and analyze all ETFs to find your next investment.',
			url: '/screener/etf/',
			tagId: 'tag-feat-nav-widget-etfscreener'
		},
		marketNews: {
			title: 'Market News',
			description: "Get the latest news to keep up with what's going on in the markets.",
			url: '/news/',
			tagId: 'tag-feat-nav-widget-news'
		},
		marketMovers: {
			title: 'Market Movers',
			description: 'The stocks that are making the biggest moves in the market.',
			url: '/markets/gainers/',
			tagId: 'tag-feat-nav-widget-movers'
		}
	}
</script>

<aside class="sidebar">
	<Sidebar1 />

	<div class="features">
		{#each list as item}
			<div class="feature">
				<a href={Features[item].url}>
					<div class="inner">
						<div class="title">{Features[item].title}</div>
						<div class="description">{Features[item].description}</div>
						<span class="icon-wrap" aria-hidden="true">
							<ArrowCTA classes="h-6 w-6" />
						</span>
					</div>
				</a>
			</div>
		{/each}
	</div>
</aside>

<style type="text/postcss">
	.sidebar:global {
		@apply space-y-8;
	}

	.features {
		@apply space-y-3;
	}

	.feature {
		@apply relative overflow-hidden rounded-lg border bg-white shadow;
	}

	.feature:hover {
		@apply shadow-md;
	}

	.inner {
		@apply px-4 py-5 sm:p-6;
	}

	.title {
		@apply text-gray-900 mb-2.5 text-xl font-bold xs:mb-3;
	}

	.description {
		@apply text-gray-800;
	}

	.icon-wrap {
		@apply absolute top-6 right-6 text-gray-300;
	}

	a:hover .icon-wrap {
		@apply text-blue-400;
	}
</style>
