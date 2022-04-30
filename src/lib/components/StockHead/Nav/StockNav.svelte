<script lang="ts">
	import type { Info } from '$lib/types/Info'
	export let info: Info
	import { page } from '$app/stores'
</script>

<nav>
	<ul class="navmenu">
		<li>
			<a
				href="/stocks/{info.symbol}/"
				data-title="Overview"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/`}
				sveltekit:prefetch>Overview</a
			>
		</li>
		<li>
			<a
				href="/stocks/{info.symbol}/financials/"
				data-title="Financials"
				class:active={$page.url.pathname.toLowerCase().includes('financials')}
				sveltekit:prefetch>Financials</a
			>
		</li>
		<li>
			<a
				href="/stocks/{info.symbol}/statistics/"
				data-title="Statistics"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/statistics/`}
				sveltekit:prefetch>Statistics</a
			>
		</li>
		<li>
			<a
				href="/stocks/{info.symbol}/forecast/"
				data-title="Forecast"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/forecast/`}
				sveltekit:prefetch>Forecast</a
			>
		</li>
		<li>
			<a
				href="/stocks/{info.symbol}/dividend/"
				data-title="Dividends"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/dividend/`}
				sveltekit:prefetch>Dividends</a
			>
		</li>
		<li>
			<a
				href="/stocks/{info.symbol}/company/"
				data-title="Profile"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/company/`}
				sveltekit:prefetch>Profile</a
			>
		</li>
		<li>
			<a
				href="/stocks/{info.symbol}/chart/"
				data-title="Chart"
				class:active={$page.url.pathname.toLowerCase() === `/stocks/${info.symbol}/chart/`}
				sveltekit:prefetch>Chart</a
			>
		</li>
	</ul>
</nav>

<style type="text/postcss">
	nav {
		@apply w-full border-b-2 border-blue-brand_sharp;
	}
</style>
