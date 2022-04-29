<script lang="ts">
	/**
	 * The financials widget shown on stock overview pages
	 */
	import { getContext } from 'svelte'

	import Button from '$lib/components/Buttons/Button.svelte'
	import FinancialsChart from './FinancialsChart.svelte'

	import type { Info } from '$lib/types/Info'
	import type { Overview } from '$lib/types/OverviewPageData'

	const info: Info = getContext('info')
	const data: Overview = getContext('data')
	console.log(data)
</script>

{#if data}
	<div>
		<h2>Financial Performance</h2>
		{#if data.financialIntro}
			<p class="mb-3">{data.financialIntro}</p>
		{/if}
		<FinancialsChart data={data.financialChart} />
		{#if info.currency !== 'USD'}
			<span class="text-sm text-gray-700">Financial numbers in {info.currency}</span>
		{/if}
		<Button href="/stocks/{info.symbol}/financials/" title="Financial Statements" classes="w-full mt-4" />
	</div>
{/if}
