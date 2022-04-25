<script lang="ts">
	import { fly, fade } from 'svelte/transition'
	import { state } from '$lib/stores/navigation'
	import type { NavigationNames } from './types'

	export let item: {
		name: NavigationNames
		href: string
		icon?: any
		children?: {
			name: string
			href: string
		}[]
		path?: string
	}

	export let collapsed: boolean
	export let url: string

	$: parent = item.path ? url.includes(item.path) : url.includes(item.href)
	$: open = typeof $state.menus[item.name] !== 'undefined' ? $state.menus[item.name] : parent
</script>

<div class:collapsed>
	<div class="nav-item" on:click={() => state.toggleMenu(item.name)} class:parent>
		<a sveltekit:prefetch href={item.href} title={item.name}>
			<svelte:component this={item.icon} classes="h-6 w-6 text-gray-500 xxl:h-5 xxl:w-5 xxxl:h-6 xxxl:w-6" />
			<span class="nav-label">{item.name}</span>
		</a>
		<div class="arrow-wrap">
			<svg class="nav-arrow" class:open viewBox="0 0 20 20" aria-hidden="true" style="max-width: 20px">
				<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
			</svg>
		</div>
	</div>
	{#if item.children}
		{#key open}
			<ul class="subitems" class:open transition:fly={{ y: -10, duration: 75 }}>
				{#each item.children as child (child.href)}
					<li>
						<a sveltekit:prefetch href={child.href} title={child.name} class:active={url === child.href}>{child.name}</a
						>
					</li>
				{/each}
			</ul>
		{/key}
	{/if}
</div>

<style>
	.nav-item {
		@apply mt-1 text-sm font-semibold text-gray-600 flex items-center hover:bg-gray-50 hover:text-gray-900 grow rounded-md;
	}

	.nav-item a {
		@apply flex items-center grow p-2 text-gray-600;
	}

	.active {
		@apply bg-blue-50 text-gray-900;
	}

	.parent {
		@apply bg-gray-100;
	}

	.nav-label {
		@apply ml-3;
	}

	.collapsed .nav-label {
		@apply hidden;
	}

	.subitems {
		@apply hidden;
	}

	.subitems.open {
		@apply pt-0.5 block;
	}

	.subitems li a {
		@apply block py-1.5 pl-11 pr-2 hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-md;
	}

	.arrow-wrap {
		@apply ml-auto border-l border-gray-300 px-1 cursor-pointer;
	}

	.collapsed .arrow-wrap {
		@apply hidden;
	}

	.nav-arrow {
		@apply h-5 w-5 text-gray-300;
	}

	.nav-arrow.open {
		@apply rotate-90 text-gray-400;
	}
</style>
