<script lang="ts">
	/**
	 * The controls buttons above the financial table
	 *
	 * TODO toggle hide/show on mobile
	 */
	import LeftRight from './Controls/LeftRight.svelte'
	import ShowTrailing from './Controls/ShowTrailing.svelte'
	import Export from './Controls/Export.svelte'
	import ExportPro from './Controls/ExportPro.svelte'

	// Get the active user, if any
	import { user } from '$lib/auth/userStore'

	import type { Range, Statement } from './types'
	import Divider from './Controls/Divider.svelte'

	export let range: Range
	export let statement: Statement
	export let data: any
</script>

<div class="controls">
	<LeftRight />
	<ShowTrailing {range} {statement} />
	<Divider />

	{#if !$user?.isPro}
		<Export />
	{:else}
		<ExportPro {data} />
	{/if}
</div>

<style>
	.controls {
		@apply pb-2 flex gap-x-2;
	}
</style>
