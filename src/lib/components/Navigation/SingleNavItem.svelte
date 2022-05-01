<script lang="ts">
	export let item: {
		name: string
		href: string
		icon?: any
	}

	export let collapsed: boolean
	export let url: string
</script>

<div class="nav-item" class:collapsed class:active={url === item.href}>
	<a sveltekit:prefetch href={item.href} title={item.name}>
		<svelte:component this={item.icon} classes="h-6 w-6 text-gray-500 xxl:h-5 xxl:w-5 xxxl:h-6 xxxl:w-6" />
		<span class="nav-label">{item.name}</span>
	</a>
</div>

<style type="text/postcss">
	.nav-item {
		@apply mt-1 text-sm font-semibold text-gray-600 flex items-center hover:bg-gray-50 hover:text-gray-900 grow rounded-md;
	}

	.nav-item a {
		@apply flex items-center grow p-2 text-gray-600;
	}

	.active {
		@apply bg-blue-50 text-gray-900;
	}

	.collapsed .nav-label {
		@apply hidden;
	}

	.nav-label {
		@apply ml-3;
	}
</style>
