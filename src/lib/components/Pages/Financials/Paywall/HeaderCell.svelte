<script lang="ts">
	import { formatYear } from '../functions'

	import type { Range } from '../types'

	export let range: Range
	export let count: number
	export let last: string

	let diff = range === 'annual' ? count - 10 : count - 40
	let yearStart = Number(formatYear(last)) - 1
	let yearEnd = yearStart - diff + 2
</script>

{#if range === 'annual'}
	{#if yearStart === yearEnd}
		<th>{yearStart}</th>
	{:else}
		<th>{yearStart} - {yearEnd}</th>
	{/if}
{:else}
	<th>+{diff} Quarters</th>
{/if}

<style>
	th {
		@apply py-[7px] font-semibold flex justify-center px-2;
	}
</style>
