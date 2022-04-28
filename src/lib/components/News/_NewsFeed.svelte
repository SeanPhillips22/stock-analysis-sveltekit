<script lang="ts">
	/**
	 * The news feed lists news, both articles and videos.
	 * Each news item has a thumbnail, source, date, title and description
	 * Native ads are also included between some news feed items for non-Pro users
	 */
	import NewsArticle from './NewsArticle.svelte'
	import NewsVideo from './NewsVideo.svelte'

	import type { NewsArray } from './types'

	export let news: NewsArray
	export let related: string | undefined
</script>

<div class="news-feed">
	{#each news as item (item.title)}
		{#if item.type === 'Video'}
			<NewsVideo {item} {related} />
		{:else}
			<NewsArticle {item} {related} />
		{/if}
	{/each}
</div>

<style>
	.news-feed:global {
		@apply mb-2 flex flex-col divide-y divide-gray-200 sm:divide-gray-100 lg:border-0;
	}
</style>
