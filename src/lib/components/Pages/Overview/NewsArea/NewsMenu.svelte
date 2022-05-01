<script lang="ts">
	import SmallSpinner from '$lib/components/Loading/SmallSpinner.svelte'
	import Search from '$lib/icons/Search.svelte'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let active: string
	export let search: string
	export let searching: boolean

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			dispatch('searchNews')
		}
	}
</script>

<div class="news-menu">
	<div class="news-nav">
		<ul>
			<li><button class:active={active === 'all'} on:click={() => dispatch('resetNews')}>All</button></li>
			<li class="hide-mobile"><button class:active={active === 'v'} on:click={() => (active = 'v')}>Videos</button></li>
			<li class="hide-mobile">
				<button class:active={active === 'pr'} on:click={() => (active = 'pr')}>Press Releases</button>
			</li>
			<li><button class:active={active === 'chat'} on:click={() => (active = 'chat')}>Conversation</button></li>
		</ul>
	</div>
	<div class="news-search">
		<input type="text" placeholder="Search news..." bind:value={search} on:keydown={handleKeyDown} />
		<div class="search-icons">
			{#if searching}
				<div class="spinner">
					<SmallSpinner />
				</div>
			{:else}
				<Search classes="h-5 w-5 text-gray-400" />
			{/if}
		</div>
	</div>
</div>

<style type="text/postcss">
	.news-menu {
		@apply flex flex-row items-center justify-between border-b;
	}

	.news-nav {
		@apply mb-0.5 text-smaller xs:text-base;
	}

	ul {
		@apply flex flex-row space-x-1 whitespace-nowrap bp:space-x-2 sm:space-x-5;
	}

	button {
		@apply text-blue-link hover:text-gray-900;
	}

	button.active {
		@apply font-semibold text-gray-900 cursor-default;
	}

	.news-search {
		@apply relative mb-1 max-w-[50%] filter sm:max-w-[170px];
	}

	input {
		@apply block w-full rounded-md border-gray-300 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:py-2;
	}

	.search-icons {
		@apply pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3;
	}

	/* iOS fix for zoom on input field */
	@supports (-webkit-touch-callout: none) {
		input {
			@apply py-1 text-base sm:py-1.5;
		}
	}

	.spinner {
		@apply pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3;
	}

	.spinner:global svg {
		@apply mr-0;
	}

	.hide-mobile {
		@apply hidden sm:block;
	}
</style>
