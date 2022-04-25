<!-- Toggle the left navigation menu -->
<script lang="ts">
	import { fade } from 'svelte/transition'

	import Hamburger from '$lib/icons/Hamburger.svelte'
	import Close from '$lib/icons/Close.svelte'

	import { state } from '$lib/stores/navigation'
</script>

{#if !$state.isOpen}
	<div on:click={state.close} in:fade={{ duration: 150 }}>
		<Close classes="header-menu-icon" />
	</div>
{:else}
	<div on:click={state.open} in:fade={{ duration: 150 }}>
		<Hamburger classes="header-menu-icon" />
	</div>
{/if}
