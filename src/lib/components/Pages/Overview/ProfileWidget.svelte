<script lang="ts">
	/**
	 * The company profile widget shown on the stock and ETF overview pages
	 */
	import { info } from '$lib/stores/infoStore'
	import { data } from '$lib/stores/dataStore'

	import Button from '$lib/components/Buttons/Button.svelte'

	let tableData = Object.keys($data.infoTable).map((key) => {
		return {
			key: $data.infoTable[key][0],
			value: $data.infoTable[key][1]
		}
	})
</script>

<div>
	<h2 class="mb-2">About {$info.ticker}</h2>
	<p>
		{$data.description}
		{#if $info.type === 'stocks'}
			<a href="/stocks/{$info.symbol}/company/" title="View company profile" tabIndex="-1" sveltekit:prefetch>
				[Read more...]
			</a>
		{/if}
	</p>

	<div class="table-wrap">
		{#if $data.infoTable}
			{#each tableData as { key, value } (key)}
				<div class={$info.type === 'etf' && key === 'Index Tracked' ? 'col-span-2' : 'col-span-1'}>
					<span class="block font-semibold">{key}</span>
					<span>{value}</span>
				</div>
			{/each}
		{/if}
	</div>

	{#if $info.type === 'stocks'}
		<Button href="/stocks/{$info.symbol}/company/" title="Full Company Profile" classes="w-full mt-4" />
	{/if}
</div>

<style type="text/postcss">
	.table-wrap {
		@apply mt-3 grid grid-cols-2 gap-3;
	}
</style>
