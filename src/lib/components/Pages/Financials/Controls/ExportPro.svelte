<script lang="ts">
	/**
	 * Export data as Excel or CSV
	 */
	import Dropdown from '$lib/components/Dropdown/_Dropdown.svelte'

	// Only import the Download component when needed
	// This component imports the ExcellentExport library which is very heavy
	// so it should only be fetched when needed
	let Download: any
	function importDownload() {
		if (Download) return Download
		return import('./Download.svelte').then((m) => {
			Download = m.default
			return Download
		})
	}

	export let data: any | undefined = undefined
</script>

<div on:mouseenter={importDownload}>
	<Dropdown title="Export">
		{#if Download}
			<svelte:component this={Download} {data} />
		{/if}
	</Dropdown>
</div>
