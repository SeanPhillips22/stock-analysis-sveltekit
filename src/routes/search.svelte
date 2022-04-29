<script lang="ts">
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import Error from '$lib/components/Alerts/Error.svelte'
	let search = $page.url.search
	let query = search.split('?q=')[1]

	let mounted = false
	onMount(() => {
		mounted = true
	})
</script>

<svelte:head>
	{#if mounted}
		<script src="https://cse.google.com/cse.js?cx=009497841191786531325:usl8eczm65r"></script>
	{/if}
</svelte:head>

<main class="contain">
	{#if query}
		<h1 class="mb-1 px-5">Search results for: {query}</h1>
	{:else}
		<Error message="Please enter a search term." />
	{/if}
	<div class="gcse-searchresults-only" />
</main>
