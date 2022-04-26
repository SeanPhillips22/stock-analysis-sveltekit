<script lang="ts">
	import SearchIcon from '../Header/SearchIcon.svelte'
</script>

<form action="/search/" method="get" role="search">
	<div class="search-wrap">
		<SearchIcon />
		<input class="search-input" type="text" placeholder="Company or stock symbol..." />
	</div>
</form>

<style>
	.search-wrap {
		@apply relative mx-auto mb-5 flex max-w-[95%] items-center text-left md:max-w-[75%] lg:max-w-lg;
	}

	.search-input {
		@apply grow rounded-sm border border-gray-200 py-1.5 pl-7 text-sm placeholder-gray-700 focus:border-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 tiny:pl-8 xs:pl-10 xs:text-base md:py-2 w-full bg-gray-50 hover:bg-white focus:bg-white lg:text-[17px];
	}
</style>
