<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/_Sidebar.svelte'

	export let data: { url: string; title: string; category: 'tag' | 'popular' }[]
</script>

<svelte:head>
	<title>Stock Lists</title>
	<meta
		name="description"
		content="Lists of stocks that share common characteristics. See companies ranked by market cap, employee count, sales or others."
	/>
	<link rel="canonical" href="https://stockanalysis.com/list/" />
</svelte:head>

<main class="contain">
	<h1>Stock Lists</h1>

	<div class="container">
		<div class="wrap">
			<div>
				<h2>Popular Lists</h2>
				<ul>
					{#each data as item (item.url)}
						{#if item.category === 'popular'}
							<li>
								<a href={item.url} sveltekit:prefetch>{item.title}</a>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
			<div>
				<h2>Stocks Ranked by Market Cap</h2>
				<ul>
					{#each data as item (item.url)}
						{#if item.category === 'tag'}
							<li>
								<a href={item.url} sveltekit:prefetch>{item.title}</a>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>

		<Sidebar />
	</div>
</main>

<style>
	h1 {
		@apply border-b-[3px] border-blue-brand_sharp pb-3 mb-3 sm:mb-4 lg:mb-5;
	}

	.container {
		@apply lg:grid lg:grid-cols-sidebar lg:gap-x-10;
	}

	.wrap {
		@apply mb-8 space-y-6;
	}

	h2 {
		@apply text-xl font-bold mb-2;
	}

	ul {
		@apply list-outside list-disc space-y-1 p-1 pl-6 md:columns-2;
	}

	a {
		@apply text-base md:text-lg;
	}
</style>
