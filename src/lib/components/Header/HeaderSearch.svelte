<script lang="ts">
	import Search from '$lib/components/Search/Search.svelte'
</script>

<div class="hd-search">
	<Search />
</div>

<style type="text/postcss">
	.hd-search {
		@apply ml-0.5 max-w-screen-xsm grow md:ml-2 xxl:ml-6 xxxl:ml-12;
	}
</style>
