<script>
	import SearchIcon from './SearchIcon.svelte'
</script>

<div class="hd-search">
	<form action="/search/" method="get" role="search">
		<div class="wrap">
			<SearchIcon />
			<input class="search-input" type="text" placeholder="Company or stock symbol..." />
		</div>
	</form>
</div>

<style>
	.hd-search {
		@apply ml-0.5 max-w-screen-xsm grow md:ml-2 xxl:ml-6 xxxl:ml-12;
	}

	.wrap {
		@apply relative flex items-center;
	}

	.search-input {
		@apply grow rounded-sm border border-gray-200 py-1.5 pl-7 text-sm placeholder-gray-700 focus:border-gray-200 focus:shadow-lg focus:outline-none focus:ring-0 tiny:pl-8 xs:pl-10 xs:text-base md:py-2 w-full bg-gray-50 hover:bg-white focus:bg-white;
	}
</style>
