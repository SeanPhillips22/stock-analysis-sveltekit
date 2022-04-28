<script lang="ts">
	/**
	 * The financials widget shown on stock overview pages
	 *
	 * TODO add conditionals to check if there is financial info before rendering the component
	 * TODO add support for non-USD currency by displaying text below the widget
	 */
	import Button from '$lib/components/Buttons/Button.svelte'
	import FinancialsChart from './FinancialsChart.svelte'
	export let text: string | undefined
	export let data: any

	import { getContext } from 'svelte'
	import type { Info } from '$lib/types/Info'

	const info: Info = getContext('info')
</script>

<div>
	<h2>Financial Performance</h2>
	{#if text}
		<p class="mb-3">{text}</p>
	{/if}
	<FinancialsChart {data} />
	<Button href="/stocks/{info.symbol}/financials/" title="Financial Statements" classes="w-full mt-4" />
</div>
