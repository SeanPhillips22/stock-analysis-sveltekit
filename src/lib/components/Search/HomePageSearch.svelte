<script lang="ts">
	import Search from '$lib/icons/Search.svelte'
</script>

<form action="/search/" method="get" role="search">
	<div class="search-wrap">
		<div class="icon-wrap">
			<Search classes="h-4 w-4 text-gray-600 xs:h-5 xs:w-5" />
		</div>
		<input class="search-input" type="text" placeholder="Company or stock symbol..." />
	</div>
</form>

<style>
	.search-wrap {
		@apply relative mx-auto mb-5 flex max-w-[95%] items-center text-left md:max-w-[75%] lg:max-w-lg;
	}

	.icon-wrap {
		@apply absolute inset-y-0 left-0 flex items-center pl-2.5;
	}

	.search-input {
		@apply grow rounded-sm border border-gray-200 py-1.5 pl-7 text-sm placeholder-gray-700 focus:border-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 tiny:pl-8 xs:pl-10 xs:text-base md:py-2 w-full bg-gray-50 hover:bg-white focus:bg-white lg:text-[17px];
	}
</style>
