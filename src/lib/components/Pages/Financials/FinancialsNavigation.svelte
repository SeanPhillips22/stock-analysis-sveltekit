<script lang="ts">
	import { info } from '$lib/stores/infoStore'
	import type { Statement, Range } from './types'

	export let statement: Statement
	export let range: Range

	$: base = `/stocks/${$info.symbol}/financials`
	$: appendStatement = statement === 'income-statement' ? '' : `/${statement}`
	$: appendRange = range === 'annual' ? '' : `${range}/`
</script>

<div class="wrap">
	<nav>
		<ul class="navmenu submenu">
			<li>
				<a href="{base}/{appendRange}" class:active={statement === 'income-statement'} sveltekit:prefetch>Income</a>
			</li>
			<li>
				<a href="{base}/balance-sheet/{appendRange}" class:active={statement === 'balance-sheet'} sveltekit:prefetch
					>Balance Sheet</a
				>
			</li>
			<li>
				<a
					href="{base}/cash-flow-statement/{appendRange}"
					class:active={statement === 'cash-flow-statement'}
					sveltekit:prefetch>Cash Flow</a
				>
			</li>
			<li><a href="{base}/ratios/{appendRange}" class:active={statement === 'ratios'} sveltekit:prefetch>Ratios</a></li>
		</ul>
	</nav>
	<nav>
		<ul class="navmenu submenu">
			<li><a href="{base}{appendStatement}/" class:active={range === 'annual'} sveltekit:prefetch>Annual</a></li>
			<li>
				<a href="{base}{appendStatement}/quarterly/" class:active={range === 'quarterly'} sveltekit:prefetch
					>Quarterly</a
				>
			</li>
			<li>
				<a href="{base}{appendStatement}/trailing/" class:active={range === 'trailing'} sveltekit:prefetch>Trailing</a>
			</li>
		</ul>
	</nav>
</div>

<slot />

<style type="text/postcss">
	.wrap {
		@apply mb-2 flex flex-col space-y-2 md:mb-3 md:flex-row md:justify-between md:space-y-0;
	}
</style>
