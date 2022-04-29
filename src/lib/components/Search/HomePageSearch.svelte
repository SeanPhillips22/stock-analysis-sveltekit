<script lang="ts">
	import Search from '$lib/components/Search/Search.svelte'
</script>

<div class="wrap">
	<Search isHomePage={true} />
</div>

<style>
	.wrap {
		@apply mb-5 mx-auto max-w-[95%] md:max-w-[75%] lg:max-w-lg;
	}

	.wrap:global input {
		@apply lg:text-[17px] bg-white;
	}
</style>
