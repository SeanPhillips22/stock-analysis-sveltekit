<script lang="ts">
	/**
	 * The news feed lists news, both articles and videos.
	 * Each news item has a thumbnail, source, date, title and description
	 * Native ads are also included between some news feed items for non-Pro users
	 */
	import NewsAd from '../Ads/Dianomi/NewsAd.svelte'
	import NewsArticle from './NewsArticle.svelte'
	import NewsVideo from './NewsVideo.svelte'

	import type { NewsArray } from './types'

	export let news: NewsArray
	export let related: string | undefined = undefined
	export let paywalled = false

	// Logic to serve ads
	let ads: number[] = []

	let count = news.length
	// let i = 2
	let ii = 2
	news.map((item, index) => {
		if (ads.length < 3) {
			ii = item.type === 'Video' ? ii + 2 : ii + 1

			if (count < 3 && count === index + 1) {
				ads = [...ads, index]
				ii = 0
			} else if (ii > 4) {
				ads = [...ads, index]
				ii = 0
			}
		}
	})
</script>

<div class="news-feed" class:pw-shadow={paywalled}>
	{#each news as item, i (i + item.title)}
		{#if item.type === 'Video'}
			<NewsVideo {item} {related} />
		{:else}
			<NewsArticle {item} {related} />
		{/if}
		{#if ads.includes(i)}
			<NewsAd number={ads.indexOf(i)} />
		{/if}
	{/each}
</div>

<style type="text/postcss">
	.news-feed:global {
		@apply mb-2 flex flex-col divide-y divide-gray-200 sm:divide-gray-100 lg:border-0;
	}

	.pw-shadow:global > div:last-child {
		position: relative;
	}

	.pw-shadow:global > div:last-child:after {
		content: '';
		height: 60%;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
	}
</style>
