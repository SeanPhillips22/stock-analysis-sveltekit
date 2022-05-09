<script lang="ts">
	import { data } from '$lib/stores/dataStore'
	import Table from '$lib/components/Tables/SimpleTable.svelte'
	export let disclaimer: boolean
</script>

<div class="wrap">
	<Table
		title="Dividend History"
		data={$data.history}
		columns={[
			{
				id: 'exDate',
				title: 'Ex-Dividend Date'
			},
			{
				id: 'amount',
				title: 'Cash Amount',
				format: 'dividend'
			},
			{
				id: 'recordDate',
				title: 'Record Date',
				class: 'hide-column-mobile'
			},
			{
				id: 'payDate',
				title: 'Pay Date'
			}
		]}
		config={{
			sortable: false,
			controls: {
				export: true
			},
			styling: {
				noBorder: true
			}
		}}
	/>
	{#if disclaimer}
		<div class="disclaimer">* Dividend amounts are adjusted for stock splits when applicable.</div>
	{/if}
</div>

<style type="text/postcss">
	.wrap {
		@apply overflow-x-auto mt-4 bp:mt-7;
	}

	.disclaimer {
		@apply mt-1 text-sm text-gray-600;
	}
</style>
