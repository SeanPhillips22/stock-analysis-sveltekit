<script lang="ts">
	/**
	 * The financials widget shown on stock overview pages
	 */
	import Button from '$lib/components/Buttons/Button.svelte'
	import FinancialsChart from './FinancialsChart.svelte'
	export let text: string | undefined
	export let data: any

	import { getContext } from 'svelte'
	import type { Info } from '$lib/types/Info'

	const info: Info = getContext('info')
</script>

{#if data}
	<div>
		<h2>Financial Performance</h2>
		{#if text}
			<p class="mb-3">{text}</p>
		{/if}
		<FinancialsChart {data} />
		{#if info.currency !== 'USD'}
			<span class="text-sm text-gray-700">Financial numbers in {info.currency}</span>
		{/if}
		<Button href="/stocks/{info.symbol}/financials/" title="Financial Statements" classes="w-full mt-4" />
	</div>
{/if}
