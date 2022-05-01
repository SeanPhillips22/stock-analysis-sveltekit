<script lang="ts">
	import Tickers from './Tickers.svelte'
	import type { NewsItem } from './types'

	export let item: NewsItem
	export let related: string | undefined

	let { title, url, text, image, tickers, timeFull, timeAgo, source } = item
</script>

<div class="news-article">
	<a href={url} target="_blank" rel="nofollow noopener noreferrer" aria-hidden="true" tabIndex="-1">
		<img src={image} alt="" loading="lazy" width="640" height="360" />
	</a>
	<div>
		<h3>
			<a href={url} target="_blank" rel="nofollow noopener noreferrer">
				{title}
			</a>
		</h3>
		<p>{text}</p>
		{#if tickers && tickers.length}
			<div class="tickers"><Tickers {tickers} intro={related} /></div>
		{/if}
		<div class="byline" title={timeFull}>{timeAgo} - {source}</div>
	</div>
</div>

<style type="text/postcss">
	.news-article {
		@apply gap-4 py-4 last:pb-1 sm:grid sm:grid-cols-news sm:py-6 md:px-0 lg:gap-5;
	}

	.news-article > a {
		@apply sm:mt-1;
	}

	img {
		@apply rounded;
	}

	.news-article > div {
		@apply flex flex-col;
	}

	h3 {
		@apply mb-2 mt-3 text-xl font-bold leading-snug sm:order-2 sm:mt-0 sm:leading-tight;
	}

	h3 a {
		@apply text-gray-900 hover:text-blue-brand_sharp;
	}

	p {
		@apply text-[0.95rem] text-gray-800 sm:order-3;
	}

	.tickers {
		@apply mt-1.5 sm:order-4 sm:mt-1 inline text-gray-800;
	}

	.byline {
		@apply mt-1 text-sm text-gray-700 sm:order-1 sm:mt-0;
	}
</style>
