<script lang="ts">
	import type { NewsArray } from '$lib/components/News/types'
	import NewsFeed from '$lib/components/News/_NewsFeed.svelte'
	import NewsMenu from './NewsMenu.svelte'

	export let news: NewsArray
	export let updated: number // TODO add logic to fetch fresh news
</script>

{#if news && news.length}
	<div class="news-wrap">
		<h2>News</h2>
		<NewsMenu />
		<NewsFeed {news} related="Other symbols" />
	</div>
{:else}
	<div class="no-news">
		<h2>News</h2>
		<span>There is no news available yet.</span>
	</div>
{/if}

<style>
	.news-wrap {
		@apply mt-6 px-4 md:px-0 lg:mt-0;
	}

	h2 {
		@apply mb-0;
	}

	.no-news {
		@apply mt-6 px-4 md:px-0 lg:mt-0;
	}

	.no-news h2 {
		@apply mb-2;
	}

	.no-news span {
		@apply text-xl;
	}
</style>
