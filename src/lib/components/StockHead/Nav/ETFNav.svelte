<script lang="ts">
	import { page } from '$app/stores'
	import { info } from '$lib/stores/infoStore'
</script>

<nav>
	<ul class="navmenu">
		<li>
			<a
				href="/etf/{$info.symbol}/"
				data-title="Overview"
				class:active={$page.url.pathname.toLowerCase() === `/etf/${$info.symbol}/`}
				sveltekit:prefetch>Overview</a
			>
		</li>
		<li>
			<a
				href="/etf/{$info.symbol}/holdings/"
				data-title="Holdings"
				class:active={$page.url.pathname.toLowerCase() === `/etf/${$info.symbol}/holdings/`}
				sveltekit:prefetch>Holdings</a
			>
		</li>
		<li>
			<a
				href="/etf/{$info.symbol}/dividend/"
				data-title="Dividends"
				class:active={$page.url.pathname.toLowerCase() === `/etf/${$info.symbol}/dividend/`}
				sveltekit:prefetch>Dividends</a
			>
		</li>
		<li>
			<a
				href="/etf/{$info.symbol}/chart/"
				data-title="Chart"
				class:active={$page.url.pathname.toLowerCase() === `/etf/${$info.symbol}/chart/`}
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
