<script lang="ts">
	/**
	 * The financials widget shown on stock overview pages
	 */

	import Button from '$lib/components/Buttons/Button.svelte'
	import FinancialsChart from './FinancialsChart.svelte'

	import type { Info } from '$lib/types/Info'
	import type { Overview } from '$lib/types/OverviewPageData'

	export let info: Info
	export let data: Overview
</script>

{#if data}
	<div>
		<h2>Financial Performance</h2>
		{#if data.financialIntro}
			<p class="mb-3">{data.financialIntro}</p>
		{/if}
		{#key info.symbol}
			<FinancialsChart data={data.financialChart} />
		{/key}
		{#if info.currency !== 'USD'}
			<span class="text-sm text-gray-700">Financial numbers in {info.currency}</span>
		{/if}
		<Button href="/stocks/{info.symbol}/financials/" title="Financial Statements" classes="w-full mt-4" />
	</div>
{/if}
