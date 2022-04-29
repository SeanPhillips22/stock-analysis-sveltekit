<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	import type { SearchResult } from './types'

	export let result: SearchResult
	export let i: number // The index of the result

	let symbol = result.s
	let name = result.n
	let type = result.t

	let path = type === 's' ? 'stocks' : 'etf'
	let tag = type === 's' ? 'Stock' : 'ETF'
</script>

<a
	href="/{path}/{symbol.toLowerCase()}/"
	on:click={() => dispatch('resultClick')}
	sveltekit:prefetch
	class:active={i === 0}
>
	<span class="text-left min-w-[3rem]">{symbol}</span>
	<span class="text-left grow">{name}</span>
	<span class="hidden text-sm sm:block">{tag}</span>
</a>

<style>
	a {
		@apply flex flex-row items-center gap-x-1 sm:gap-x-2 py-1.5 px-2 sm:px-3 hover:bg-gray-100 text-gray-900;
	}

	.active {
		@apply bg-gray-100;
	}
</style>
