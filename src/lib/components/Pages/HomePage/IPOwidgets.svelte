<script lang="ts">
	import ChevronRight from '$lib/icons/ChevronRight.svelte'

	type Ipos = { date: string; symbol: string; name: string }[]

	export let recent: Ipos
	export let upcoming: Ipos
</script>

<div class="wrap">
	<section>
		<a href="/news/" class="title" sveltekit:prefetch>
			<h2>Recent IPOs</h2>
			<ChevronRight classes="h-5 w-5" />
		</a>
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Symbol</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{#each recent as { date, symbol, name } (symbol)}
					<tr>
						<td>{date}</td>
						<td><a href="/stocks/{symbol.toLowerCase()}/">{symbol}</a></td>
						<td>{name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
	<section>
		<a href="/news/" class="title" sveltekit:prefetch>
			<h2>Upcoming IPOs</h2>
			<ChevronRight classes="h-5 w-5" />
		</a>
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Symbol</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{#each upcoming as { date, symbol, name } (symbol)}
					<tr>
						<td>{date}</td>
						<td><a href="/stocks/{symbol.toLowerCase()}/">{symbol}</a></td>
						<td>{name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>

<style type="text/postcss">
	.wrap {
		@apply flex flex-col space-y-6 lg:space-y-8 pt-6 lg:pt-0;
	}

	section {
		@apply px-3 xs:px-4 sm:px-5 lg:px-0;
	}

	a.title {
		@apply flex items-center hover:underline text-gray-900;
	}

	h2 {
		@apply text-xl font-bold leading-tight bp:text-2xl bp:leading-tight mb-2;
	}

	table {
		@apply w-full text-sm sm:text-base;
	}

	th,
	td {
		@apply border border-gray-200 py-1.5 px-2 text-left;
	}
</style>
