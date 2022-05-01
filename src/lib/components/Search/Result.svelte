<script lang="ts">
	import { page } from '$app/stores'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	import type { SearchResult } from './types'

	export let result: SearchResult
	export let i: number // The index of the result
	export let num: number // The highlighted result for keyboard navigation

	let symbol = result.s
	let name = result.n
	let type = result.t

	let path = type === 's' ? 'stocks' : 'etf'
	let tag = type === 's' ? 'Stock' : 'ETF'
	let url = `/${path}/${symbol.toLowerCase()}/`

	// If the user is on a subpage (f.x. /financials/) then append that to the URL
	let splitRoute = $page.routeId?.split('/')
	let currentPage: string | undefined = splitRoute ? splitRoute[0] : undefined

	if (splitRoute && splitRoute.length > 2 && (currentPage === 'stocks' || currentPage === 'etf')) {
		let subPage = splitRoute[2]

		switch (subPage) {
			case 'chart':
				url += 'chart/'
				break

			case 'dividend':
				url += 'dividend/'
				break

			case 'company':
				if (type === 's') url += 'company/'
				break

			case 'statistics':
				if (type === 's') url += 'statistics/'

				break

			case 'forecast':
				if (type === 's') url += 'forecast/'
				break

			case 'holdings':
				if (type === 'e') url += 'holdings/'
				break

			case 'financials':
				{
					if (type === 's') {
						let statementType = splitRoute[3] ?? null // income statement, etc
						let financialPeriod = splitRoute[4] ? splitRoute[4] + '/' : '' // quarterly or trailing

						switch (statementType) {
							case 'balance-sheet':
								url += 'financials/balance-sheet/' + financialPeriod
								break

							case 'cash-flow-statement':
								url += 'financials/cash-flow-statement/' + financialPeriod
								break

							case 'ratios':
								url += 'financials/ratios/' + financialPeriod
								break

							default:
								financialPeriod = splitRoute[3] ? splitRoute[3] + '/' : ''
								url += 'financials/' + financialPeriod
								break
						}
					}
				}
				break

			default:
				break
		}
	}

	// Focus the active search result when scrolling down with keyboard navigation
	// in order to make the dropdown scroll with the keyboard
	// then immediately yield the focus back to the input element
	// so that it continues to listen to the key presses
	export let inputRef: HTMLInputElement
	let linkRef: HTMLAnchorElement | null = null
	$: isActive = i === num - 1
	$: {
		if (isActive && linkRef && num > 5) {
			linkRef.focus()
			inputRef.focus()
		}
	}
</script>

<a
	href={url}
	on:click={() => dispatch('resultClick')}
	sveltekit:prefetch
	class:active-search-result={isActive}
	bind:this={linkRef}
>
	<span class="text-left min-w-[3rem]">{symbol}</span>
	<span class="text-left grow">{name}</span>
	<span class="hidden text-sm sm:block">{tag}</span>
</a>

<style type="text/postcss">
	a {
		@apply flex flex-row items-center gap-x-1 sm:gap-x-2 py-1.5 px-2 sm:px-3 hover:bg-gray-100 text-gray-900;
	}

	.active-search-result {
		@apply bg-gray-100;
	}
</style>
