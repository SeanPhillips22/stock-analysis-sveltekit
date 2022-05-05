<script lang="ts">
	import { goto } from '$app/navigation'
	import LockClosed from '$lib/icons/LockClosed.svelte'
	import type { Range } from '../types'

	export let range: Range
	export let count: number

	let type = range === 'annual' ? 'years' : 'quarters'
	let countShown = range === 'annual' ? 10 : 40
	let countFull = range === 'annual' ? count - 1 : count
	let title = `Showing ${countShown} of ${countFull} ${type}`
</script>

<td>
	<div {title} on:click={() => goto('/pro/')}>
		Upgrade
		<LockClosed classes="ml-1 h-3.5 w-3.5" />
	</div>
</td>

<style>
	td {
		@apply px-2;
	}
	div {
		@apply flex cursor-pointer items-center justify-center py-0.5 text-small font-medium text-gray-500 hover:text-gray-700;
	}
</style>
