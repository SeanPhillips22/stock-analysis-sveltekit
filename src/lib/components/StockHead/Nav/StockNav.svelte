<script>
	export let info
	import { page } from '$app/stores'
</script>

<nav>
	<ul class="navmenu">
		<li>
			<a
				sveltekit:prefetch
				href="/stocks/{info.symbol}/"
				data-title="Overview"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/`}>Overview</a
			>
		</li>
		<li>
			<a
				sveltekit:prefetch
				href="/stocks/{info.symbol}/financials/"
				data-title="Financials"
				class:active={$page.url.pathname.toLowerCase().includes('financials')}>Financials</a
			>
		</li>
		<li>
			<a
				sveltekit:prefetch
				href="/stocks/{info.symbol}/statistics/"
				data-title="Statistics"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/statistics/`}>Statistics</a
			>
		</li>
		<li>
			<a
				sveltekit:prefetch
				href="/stocks/{info.symbol}/forecast/"
				data-title="Forecast"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/forecast/`}>Forecast</a
			>
		</li>
		<li>
			<a
				sveltekit:prefetch
				href="/stocks/{info.symbol}/dividend/"
				data-title="Dividends"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/dividend/`}>Dividends</a
			>
		</li>
		<li>
			<a
				sveltekit:prefetch
				href="/stocks/{info.symbol}/company/"
				data-title="Profile"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/company/`}>Profile</a
			>
		</li>
		<li>
			<a
				sveltekit:prefetch
				href="/stocks/{info.symbol}/chart/"
				data-title="Chart"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/chart/`}>Chart</a
			>
		</li>
	</ul>
</nav>

<style>
	nav {
		@apply w-full border-b-2 border-blue-brand_sharp;
	}
</style>
