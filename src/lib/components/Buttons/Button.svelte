<script lang="ts">
	export let href: string
	export let title: string
	export let classes: string | undefined = undefined
</script>

<button class="button {classes}">
	<a {href} sveltekit:prefetch>{title}</a>
</button>

<style type="text/postcss">
	.button {
		@apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-lg font-semibold rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-brand_light text-white hover:bg-blue-brand_sharp whitespace-nowrap  w-full;
		background-color: #3c74d4;
	}

	.button a {
		@apply text-white;
		color: #ffffff;
	}
</style>
