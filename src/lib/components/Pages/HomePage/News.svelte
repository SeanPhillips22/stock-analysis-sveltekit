<script lang="ts">
	import ChevronRight from '$lib/icons/ChevronRight.svelte'
	export let news: { t: string; u: string; n: string; d: string }[]
</script>

<section class="wrap">
	<a href="/news/" class="title" sveltekit:prefetch>
		<h2>Market News</h2>
		<ChevronRight classes="h-5 w-5" />
	</a>
	<table>
		<tbody>
			{#each news as { t, u, n, d } (u)}
				<tr>
					<td class="updated">{d}</td>
					<td class="title">
						<a href={u} target="_blank" rel="nofollow noopener noreferrer">{t}</a>
						<span class="text-gray-600"> - {n}</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="more">
		<span>More News: </span>
		<a href="/news/" sveltekit:prefetch>Markets</a>
		<a href="/news/all-stocks/" sveltekit:prefetch>All Stocks</a>
		<a href="/ipos/news/" sveltekit:prefetch>IPO News</a>
	</div>
</section>

<style>
	.wrap {
		@apply mx-auto px-3 xs:px-4 sm:px-5 lg:col-span-2 lg:px-0;
	}

	a.title {
		@apply flex items-center hover:underline text-gray-900;
	}

	h2 {
		@apply text-xl font-bold leading-tight bp:text-2xl bp:leading-tight mb-2;
	}

	table {
		@apply border-t border-gray-200 text-sm sm:text-base;
	}

	tr {
		@apply border-b border-gray-200 hover:bg-gray-50;
	}

	tr td.updated {
		@apply pr-1 pt-2 align-top text-gray-600;
	}

	tr td.title {
		@apply py-2 pl-2;
	}

	.more {
		@apply border-b border-gray-200 pl-0.5 pt-3 pb-2 text-base font-semibold bp:pl-1 sm:pl-2 sm:text-lg;
	}

	.more a {
		@apply ml-2 mb-1 inline-flex items-center rounded-md bg-gray-100 px-1.5 py-1 text-sm font-semibold hover:bg-gray-200 bp:px-2 sm:ml-2 sm:text-base;
	}
</style>
