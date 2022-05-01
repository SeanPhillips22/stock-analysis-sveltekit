<!-- TODO enable lazy loading for ads -->
<script lang="ts">
	import NewsAd1 from './NewsAd1.svelte'
	import NewsAd2 from './NewsAd2.svelte'
	import NewsAd3 from './NewsAd3.svelte'

	export let number: number
</script>

{#if number === 0}
	<NewsAd1 />
{:else if number === 1}
	<NewsAd2 />
{:else if number === 2}
	<NewsAd3 />
{/if}
