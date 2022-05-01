<script lang="ts">
	import ChevronRight from '$lib/icons/ChevronRight.svelte'
	import MoverHeading from './MoverHeading.svelte'
	type Movers = { symbol: string; name: string; price: string; change: string }[]

	export let date: string
	export let marketStatus: string
	export let gainers: Movers
	export let losers: Movers
</script>

<section class="wrap">
	<div class="grow">
		{#if marketStatus === 'premarket'}
			<MoverHeading url="/markets/premarket/gainers/" title="Pre-Market Gainers" {date} />
		{:else}
			<MoverHeading url="/markets/gainers/" title="Top Gainers" {date} />
		{/if}

		<table>
			<thead>
				<tr>
					<th>Symbol</th>
					<th>Name</th>
					<th>Price</th>
					<th>Change</th>
				</tr>
			</thead>
			<tbody>
				{#each gainers as { symbol, name, price, change } (symbol)}
					<tr>
						<td><a href="/stocks/{symbol.toLowerCase()}/">{symbol}</a></td>
						<td>{name}</td>
						<td>${price}</td>
						<td class="text-green-700">{change}%</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="grow">
		{#if marketStatus === 'premarket'}
			<MoverHeading url="/markets/premarket/losers/" title="Pre-Market Losers" {date} />
		{:else}
			<MoverHeading url="/markets/losers/" title="Top Losers" {date} />
		{/if}

		<table>
			<thead>
				<tr>
					<th>Symbol</th>
					<th>Name</th>
					<th>Price</th>
					<th>Change</th>
				</tr>
			</thead>
			<tbody>
				{#each losers as { symbol, name, price, change } (symbol)}
					<tr>
						<td><a href="/stocks/{symbol.toLowerCase()}/">{symbol}</a></td>
						<td>{name}</td>
						<td>${price}</td>
						<td class="text-red-600">{change}%</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style type="text/postcss">
	.wrap {
		@apply mx-auto flex flex-col space-y-6 px-3 xs:px-4 sm:px-5 lg:max-w-[1200px] lg:flex-row lg:justify-evenly lg:space-y-0 lg:space-x-14;
	}

	table {
		@apply w-full border border-gray-200;
	}

	table tr > * {
		@apply py-1.5 sm:py-2 px-1.5 xs:px-2 sm:px-3 xl:px-4 text-sm sm:text-base border border-gray-200;
	}

	table tr > * {
		@apply text-left;
	}

	table tr > *:nth-child(3),
	table tr > *:nth-child(4) {
		@apply text-right;
	}
</style>
