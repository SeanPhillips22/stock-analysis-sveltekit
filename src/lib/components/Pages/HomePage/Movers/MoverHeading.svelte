<script lang="ts">
	import ChevronRight from '$lib/icons/ChevronRight.svelte'

	export let date: string
	export let url: string
	export let title: string
</script>

<div class="heading-wrap">
	<a href={url} sveltekit:prefetch>
		<h2>{title}</h2>
		<ChevronRight classes="h-5 w-5" />
	</a>
	<span class="updated">
		<span>Updated </span>
		{date}
	</span>
</div>

<style type="text/postcss">
	.heading-wrap {
		@apply mb-1 flex flex-row items-end justify-between;
	}

	a {
		@apply flex items-center hover:underline text-gray-900;
	}

	h2 {
		@apply mb-0.5 text-xl font-bold leading-tight bp:text-2xl bp:leading-tight md:mb-1;
	}

	.updated {
		@apply text-xs text-gray-600 xs:text-sm;
	}

	.updated span {
		@apply hidden sm:inline;
	}
</style>
