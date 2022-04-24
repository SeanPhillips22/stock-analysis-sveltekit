<script>
	import HeaderLogo from './HeaderLogo.svelte'
	import HeaderMenuToggle from './HeaderMenuToggle.svelte'
	import HeaderSearch from './HeaderSearch.svelte'
</script>

<header>
	<div class="inner">
		<HeaderMenuToggle />
		<HeaderLogo />
		<HeaderSearch />
	</div>
</header>

<style>
	header {
		@apply sticky top-0 z-50 bg-white shadow-md landscape:static landscape:lg:sticky;
		background-color: #ffffff;
	}

	.inner {
		@apply flex flex-row items-center gap-x-1 py-1.5 px-1 tiny:gap-x-1 tiny:px-2 xs:gap-x-3 xs:px-3 sm:py-2 lg:gap-x-4 xxl:px-4 xxxl:px-6;
	}
</style>
