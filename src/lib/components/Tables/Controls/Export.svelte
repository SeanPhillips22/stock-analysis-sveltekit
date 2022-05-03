<script lang="ts">
	/**
	 * Export button
	 */
	import { goto } from '$app/navigation'
	import { user } from '$lib/auth/userStore'
	import Dropdown from '$lib/components/Dropdown/_Dropdown.svelte'
	import LockClosed from '$lib/icons/LockClosed.svelte'
	import Download from './Download.svelte'

	export let data: any | undefined = undefined
</script>

<Dropdown title="Export">
	{#if !$user?.isPro}
		<div class="dd" title="This feature is available for Pro members." on:click={() => goto('/pro/')}>
			Export to Excel
			<LockClosed classes="h-4 w-4 text-gray-500" />
		</div>
		<div class="dd" title="This feature is available for Pro members." on:click={() => goto('/pro/')}>
			Export to CSV
			<LockClosed classes="h-4 w-4 text-gray-500" />
		</div>
	{:else}
		<Download {data} />
	{/if}
</Dropdown>

<style>
</style>
