<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition'
	import Search from '$lib/icons/Search.svelte'
	import Result from './Result.svelte'
	import { doSearch } from './doSearch'
	import type { SearchResult } from './types'
	import { clickOutside } from '$lib/functions/ui/clickOutside'
	import SmallSpinner from '../Loading/SmallSpinner.svelte'
	import Close from '$lib/icons/Close.svelte'

	let open = false // Is the dropdown open
	let query = '' // The search query
	let debouncedQuery = '' // The debounced search query
	let searching = false // Is a search in progress
	let results: SearchResult[] = [] // The search results

	// Ping the search worker to load results into cache
	export let isHomePage = false
	let warmedUp = false
	const warmUpCache = async () => {
		if (!warmedUp) {
			warmedUp = true
			await fetch('https://api.stockanalysis.com/search?q=getready', {
				mode: 'no-cors'
			})
		}
	}

	onMount(() => {
		if (isHomePage) warmUpCache()
	})

	// Initially, fetch the trending data and ping the search worker
	// to load the results into cache
	let initialFetched = false
	let trendingIsShowing = false
	let trending: SearchResult[] = []
	const initial = async () => {
		if (!initialFetched) {
			initialFetched = true
			let res = await fetch('https://api.stockanalysis.com/wp-json/sa/trending?q=top')
			let data = await res.json()
			trending = data

			if (!warmedUp) warmUpCache()
		}
	}

	// Perform the search
	const search = async (query: string) => {
		searching = true
		let searchResults = await doSearch(query)
		results = searchResults
		searching = false
	}

	// Debounce functionality in order to prevent unnecessary
	// searches for users who type fast
	let timer: ReturnType<typeof setTimeout>
	const debounce = (v: string) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			debouncedQuery = v
		}, 150)
	}

	// When there is a search query, debounce the query
	// before performing a search
	$: {
		if (query.length) {
			debounce(query)
		} else {
			debouncedQuery = ''
			clearTimeout(timer)
		}
	}

	// When there is a search query, perform a search
	$: {
		if (debouncedQuery.length) {
			trendingIsShowing = false
			search(debouncedQuery)
		} else {
			trendingIsShowing = true
			results = trending
		}
	}
</script>

<form action="/search/" method="get" role="search">
	<div class="search-wrap">
		<div class="icon-wrap">
			<Search classes="h-4 w-4 text-gray-600 xs:h-5 xs:w-5" />
		</div>
		<input
			class="search-input"
			type="text"
			autocomplete="off"
			spellcheck="false"
			placeholder="Company or stock symbol..."
			name="q"
			on:mouseenter={() => {
				if (!initialFetched) initial()
			}}
			on:click={() => {
				open = true
				if (!initialFetched) initial()
			}}
			bind:value={query}
		/>

		<!-- Search Spinner or "x" to close search -->
		{#if searching}
			<div class="spinner" in:fade>
				<SmallSpinner />
			</div>
		{:else if query.length}
			<div
				class="close"
				aria-label="Clear"
				title="Clear"
				tabIndex="0"
				in:fade
				on:click={() => {
					query = ''
					open = false
				}}
			>
				<Close classes="h-4 w-4 xs:h-5 xs:w-5 text-gray-600 hover:text-blue-500" />
			</div>
		{/if}

		<!-- Search Dropdown -->
		{#if open}
			<div class="results" use:clickOutside={() => (open = false)} transition:fade={{ duration: 100 }}>
				{#if trendingIsShowing}
					<h4>Trending</h4>
				{/if}
				<ul>
					{#if results.length}
						{#each results as result, i (result.s)}
							<li><Result {result} {i} on:resultClick={() => (open = false)} /></li>
						{/each}
					{:else if debouncedQuery.length}
						<li class="no-results">
							<a href="/search/?q={debouncedQuery}">No results found. Try a full text search instead.</a>
						</li>
					{/if}
				</ul>
			</div>
		{/if}
	</div>
</form>

<style>
	.search-wrap {
		@apply relative flex items-center;
	}

	.icon-wrap {
		@apply absolute inset-y-0 left-0 flex items-center pl-2.5;
	}

	input {
		@apply grow rounded-sm border border-gray-200 py-1.5 pl-7 text-sm placeholder-gray-700 focus:border-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 tiny:pl-8 xs:pl-10 xs:text-base md:py-2 w-full bg-gray-50 hover:bg-white focus:bg-white;
	}

	.spinner {
		@apply pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3;
	}

	.spinner:global svg {
		@apply mr-0;
	}

	.close {
		@apply absolute inset-y-0 right-0 flex items-center pr-3;
	}

	.results {
		@apply absolute top-9 md:top-10 shadow-lg bg-white border border-gray-200 w-full max-h-[265px] overflow-y-auto;
	}

	li {
		@apply border-b border-gray-200 first:border-t last:border-none;
	}

	h4 {
		@apply py-1.5 px-2 text-lg font-semibold sm:px-3 text-left;
	}

	.no-results a {
		@apply flex py-1.5 px-2 text-base sm:px-3 md:text-lg bg-gray-100;
	}
</style>
