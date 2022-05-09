<script lang="ts">
	/**
	 * The financials widget shown on stock overview pages
	 */
	import { info } from '$lib/stores/infoStore'
	import { data } from '$lib/stores/dataStore'

	import Button from '$lib/components/Buttons/Button.svelte'
	import FinancialsChart from './FinancialsChart.svelte'
</script>

<div>
	<h2>Financial Performance</h2>
	{#if $data.financialIntro}
		<p class="mb-3">{$data.financialIntro}</p>
	{/if}
	{#key $info.symbol}
		<FinancialsChart />
	{/key}
	{#if $info.currency !== 'USD'}
		<span class="text-sm text-gray-700">Financial numbers in {$info.currency}</span>
	{/if}
	<Button href="/stocks/{$info.symbol}/financials/" title="Financial Statements" classes="w-full mt-4" />
</div>
