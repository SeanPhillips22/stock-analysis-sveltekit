<script lang="ts">
	/**
	 * Controls buttons to show above a table.
	 * Export, Filter, etc.
	 */
	// Get the active user, if any
	import { user } from '$lib/auth/userStore'

	// Components
	import Filter from '$lib/components/Controls/Filter.svelte'
	import Export from '$lib/components/Controls/Export.svelte'
	import ExportPro from '$lib/components/Controls/ExportPro.svelte'

	// Types
	import type { TableConfig } from './types'

	export let config: TableConfig
	export let filter: string
	export let data: any | undefined = undefined
</script>

{#if config.controls}
	{#if config.controls.export}
		{#if !$user?.isPro}
			<Export />
		{:else}
			<ExportPro {data} />
		{/if}
	{/if}

	{#if config.controls.filter}
		<Filter bind:filter />
	{/if}
{/if}
