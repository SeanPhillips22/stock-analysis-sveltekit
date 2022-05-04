<script lang="ts">
	/**
	 * The container for the hover chart. Handles the display logic.
	 *
	 * TODO add lazy loading so that the chart library is only loaded when a user hovers over the table cell
	 */
	import { fade } from 'svelte/transition'
	import Icon from '$lib/icons/HoverChart.svelte'
	import HoverChart from './_HoverChart.svelte'
	import { formatYear } from '../functions'
	import type { Range } from '../types'
	import type { Info } from '$lib/types/Info'
	import { capitalize } from '$lib/functions/utils/capitalize'

	export let dates: string[]
	export let data: number[]
	export let range: Range
	export let info: Info
	export let name: string

	let title = `${info.symbol.toUpperCase()} ${name} (${capitalize(range)})`

	let chartDates: any[]
	let chartData: number[]
	$: {
		chartDates = dates?.slice(1).reverse()
		chartData = data?.slice(1).reverse()

		if (range === 'annual') {
			chartDates = chartDates.map((m) => formatYear(m))
		}
	}

	let iconRef: any
	let chartRef: any = ''

	let hasLeft = false // If the mouse has been moved away from the icon
	let hovering = false // If the mouse is hovering over the icon
	let x: number
	let y: number
	let yPos: number

	function entering(event: MouseEvent) {
		hasLeft = false
		setTimeout(() => {
			if (!hasLeft) {
				hovering = true
				x = event.pageX
				y = event.pageY
				let rect = iconRef.getBoundingClientRect()
				yPos = event.clientY - rect.top
			}
		}, 100)
	}

	function leaving(event: MouseEvent) {
		hasLeft = true
		// If mouse moved into chart, don't close
		setTimeout(() => {
			if (event.relatedTarget === chartRef) {
				return
			}
			hovering = false
		}, 100)
	}
</script>

<div class="icon" class:active={hovering} bind:this={iconRef} on:mouseenter={entering} on:mouseleave={leaving}>
	<Icon />
</div>
{#if hovering}
	<div
		class="wrap"
		style="bottom: calc(100% - {y - yPos + 1}px); left: {x - 50}px;"
		in:fade={{ delay: 200, duration: 75 }}
	>
		<HoverChart bind:ref={chartRef} dates={chartDates} data={chartData} bind:hovering seriesName={name} {title} />
	</div>
{/if}

<style>
	/**
	* Icon styles
	*/
	.icon {
		@apply z-10 border border-t-0 border-transparent p-[3px];
	}

	.icon:global svg {
		@apply my-0 mx-1 h-[22px] w-[22px] stroke-[#777];
	}

	.icon.active {
		@apply z-50 border-gray-200 bg-white delay-200;
	}

	.icon.active:global svg {
		@apply stroke-[#2c6288];
	}

	.icon:global svg:focus {
		@apply stroke-[#2c6288];
	}

	/**
    * Hover chart styles
    */
	.wrap {
		@apply absolute border border-gray-200 bg-white z-20;
	}
</style>
