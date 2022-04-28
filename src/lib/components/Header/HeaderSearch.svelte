<script lang="ts">
	import Search from '$lib/icons/Search.svelte'
</script>

<div class="hd-search">
	<form action="/search/" method="get" role="search">
		<div class="wrap">
			<div class="icon-wrap">
				<Search classes="h-4 w-4 text-gray-600 xs:h-5 xs:w-5" />
			</div>
			<input class="search-input" type="text" placeholder="Company or stock symbol..." />
		</div>
	</form>
</div>

<style type="text/postcss">
	.hd-search {
		@apply ml-0.5 max-w-screen-xsm grow md:ml-2 xxl:ml-6 xxxl:ml-12;
	}

	.wrap {
		@apply relative flex items-center;
	}

	.icon-wrap {
		@apply absolute inset-y-0 left-0 flex items-center pl-2.5;
	}

	.search-input {
		@apply grow rounded-sm border border-gray-200 py-1.5 pl-7 text-sm placeholder-gray-700 focus:border-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 tiny:pl-8 xs:pl-10 xs:text-base md:py-2 w-full bg-gray-50 hover:bg-white focus:bg-white;
	}
</style>
