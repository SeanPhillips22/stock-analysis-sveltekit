<script lang="ts">
	import { getContext } from 'svelte'
	import type { Info } from '$lib/types/Info'
	import Search from '$lib/icons/Search.svelte'

	const info: Info = getContext('info')
</script>

<div class="news-menu">
	<div class="news-nav">
		<ul>
			<li><button>All</button></li>
			<li><button>Videos</button></li>
			<li><button>Press Releases</button></li>
			<li><button>Conversation</button></li>
		</ul>
	</div>
	<div class="news-search">
		<input type="text" placeholder="Search news..." />
		<div class="search-icons">
			<Search classes="h-5 w-5 text-gray-400" />
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
</style>
