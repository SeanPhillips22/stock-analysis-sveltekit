<script lang="ts">
	export let href: string
	export let title: string
	export let classes: string | undefined = undefined
</script>

<button class="button {classes}">
	<a {href}>{title}</a>
</button>

<style type="text/postcss">
	.button {
		@apply inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-lg font-semibold rounded-sm shadow-sm text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500;
	}

	.button a {
		@apply text-gray-900;
		color: #111827;
	}
</style>
