<script lang="ts">
	/**
	 * Export button
	 */
	import { goto } from '$app/navigation'
	import Dropdown from '$lib/components/Dropdown/_Dropdown.svelte'
	import LockClosed from '$lib/icons/LockClosed.svelte'
</script>

<Dropdown title="Export">
	<div class="dd" title="This feature is available for Pro members." on:click={() => goto('/pro/')}>
		Export to Excel
		<LockClosed classes="h-4 w-4 text-gray-500" />
	</div>
	<div class="dd" title="This feature is available for Pro members." on:click={() => goto('/pro/')}>
		Export to CSV
		<LockClosed classes="h-4 w-4 text-gray-500" />
	</div>
	<div class="dd" title="This feature is available for Pro members." on:click={() => goto('/pro/')}>
		Bulk Export
		<LockClosed classes="h-4 w-4 text-gray-500" />
	</div>
</Dropdown>
