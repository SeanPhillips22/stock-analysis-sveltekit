<script lang="ts">
	import Tickers from './Tickers.svelte'
	import type { NewsItem } from './types'

	export let item: NewsItem
	export let related: string | undefined

	let { title, url, text, tickers, timeFull, timeAgo, source } = item
</script>

<div class="news-video">
	<h3>{title}</h3>
	<div class="embed">Embed</div>
	<p>{text}</p>
	{#if tickers && tickers.length}
		<div class="tickers"><Tickers {tickers} intro={related} /></div>
	{/if}
	<div class="byline" title={timeFull}>{timeAgo} - {source}</div>
</div>

<style>
	.news-video {
		@apply flex flex-col bg-white p-4 shadow last:pb-1 last:shadow-none sm:py-6 sm:shadow-none sm:first:pt-4 md:px-0;
	}

	h3 {
		@apply mb-2.5 text-xl font-bold leading-snug xs:mb-3 sm:order-2 sm:leading-tight;
	}

	.embed {
		@apply mb-3 sm:order-3 lg:pr-2;
	}

	p {
		@apply text-[0.95rem] text-gray-800 sm:order-4;
	}

	.tickers {
		@apply mt-1.5 sm:order-5 sm:mt-1;
	}

	.byline {
		@apply mt-1 text-sm text-gray-700 sm:order-1 sm:mt-0;
	}
</style>
