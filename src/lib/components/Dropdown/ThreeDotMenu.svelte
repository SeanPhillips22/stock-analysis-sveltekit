<script lang="ts">
	import { fly } from 'svelte/transition'
	import { clickOutside } from '$lib/functions/ui/clickOutside'
	import VerticalDots from '$lib/icons/VerticalDots.svelte'

	let open = false

	const handleClickOutside = () => {
		setTimeout(() => {
			open = false
		}, 50)
	}

	const close = () => (open = false)
</script>

<div class="controls-menu">
	<button class="controls-btn" on:click={() => (open = !open)}>
		<VerticalDots classes="w-5 h-5" />
	</button>

	{#if open}
		<div
			class="dropdown"
			on:click={() => close()}
			use:clickOutside={handleClickOutside}
			in:fly={{ y: -10, duration: 75 }}
		>
			<slot />
		</div>
	{/if}
</div>

<style type="text/postcss">
	.controls-menu {
		@apply relative inline-block text-left;
	}

	.dropdown {
		@apply absolute right-0 z-50 mt-2 min-w-[160px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none;
		background-color: #ffffff;
	}
</style>
