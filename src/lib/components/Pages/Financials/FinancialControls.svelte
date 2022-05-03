<script lang="ts">
	import Export from './Controls/Export.svelte'
	import ExportPro from './Controls/ExportPro.svelte'

	// Get the active user, if any
	import { user } from '$lib/auth/userStore'

	export let data: any
</script>

<div class="controls">
	{#if !$user?.isPro}
		<Export />
	{:else}
		<ExportPro {data} />
	{/if}
</div>

<style>
	.controls {
		@apply pb-2;
	}
</style>
