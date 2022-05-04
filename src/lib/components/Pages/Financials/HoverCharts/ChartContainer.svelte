<script lang="ts">
	/**
	 * The container for the hover chart. Handles the display logic.
	 *
	 * TODO add lazy loading so that the chart library is only loaded when a user hovers over the table cell
	 */
	import { fade } from 'svelte/transition'
	import Icon from '$lib/icons/HoverChart.svelte'

	// Types
	import type { Range } from '../types'
	import type { Info } from '$lib/types/Info'

	// Props
	export let dates: string[]
	export let data: number[]
	export let range: Range
	export let info: Info
	export let name: string
	export let mouseActive: boolean

	// Only load hover chart if the mouse is active
	// over the financials table
	let HoverChart: any
	const lazyLoadChart = async () => {
		let loaded = await import('./_HoverChart.svelte')
		HoverChart = loaded.default
	}
	$: mouseActive && lazyLoadChart()

	/**
	 * Display and position the hover chart
	 */
	let iconRef: any
	let chartRef: any = ''

	let hasLeft = false // If the mouse has been moved away from the icon
	let hovering = false // If the mouse is hovering over the icon
	let x: number
	let yPos: number

	function entering(event: MouseEvent) {
		hasLeft = false
		setTimeout(() => {
			if (!hasLeft) {
				hovering = true
				x = event.pageX
				let y = event.pageY
				let rect = iconRef.getBoundingClientRect()
				yPos = y - (event.clientY - rect.top) + 1
			}
		}, 100)
	}

	function leaving(event: MouseEvent) {
		hasLeft = true

		setTimeout(() => {
			// If mouse moved into chart, don't close
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
	<div class="wrap" style="bottom: calc(100% - {yPos}px); left: {x - 50}px;" in:fade={{ delay: 200, duration: 75 }}>
		<HoverChart bind:ref={chartRef} {dates} {data} bind:hovering seriesName={name} {range} {info} />
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
