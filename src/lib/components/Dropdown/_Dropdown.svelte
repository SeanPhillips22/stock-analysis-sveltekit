<script lang="ts">
	import { clickOutside } from '$lib/functions/ui/clickOutside'
	import ChevronDown from '$lib/icons/ChevronDown.svelte'

	export let title: string
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
		{title}
		<ChevronDown classes="-mr-1 ml-1 h-5 w-5 xs:ml-2" />
	</button>

	{#if open}
		<div class="dropdown" on:click={close} use:clickOutside={handleClickOutside}>
			<slot />
		</div>
	{/if}
</div>

<style>
	.controls-menu {
		@apply relative inline-block text-left;
	}

	.dropdown {
		@apply absolute right-0 z-50 mt-2 min-w-[160px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none;
		background-color: #ffffff;
	}
</style>
