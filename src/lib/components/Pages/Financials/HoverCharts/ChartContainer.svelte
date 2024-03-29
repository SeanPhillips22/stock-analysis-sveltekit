<script lang="ts">
	/**
	 * The container for the hover chart. Handles the display logic.
	 *
	 * TODO Make the chart persistent on click?
	 */
	import { fade } from 'svelte/transition'
	import Icon from '$lib/icons/HoverChart.svelte'

	// Types
	import type { Range } from '../types'

	// Props
	export let dates: string[]
	export let data: number[]
	export let range: Range
	export let name: string

	/**
	 * Display and position the hover chart
	 */
	let iconRef: any
	let chartRef: any = ''

	// let hasLeft = false // If the mouse has been moved away from the icon
	let hovering = false // If the mouse is hovering over the icon
	let x: number
	let yPos: number
	let w: number

	let hasEntered = false // If mouse moves into chart area within 100ms
	function entering(event: MouseEvent) {
		hasEntered = false
		setTimeout(() => {
			hovering = true
			if (window?.innerWidth < 768) {
				x = 5
				w = window.innerWidth - 10
			} else {
				x = event.pageX - 60
				w = 600
			}
			let y = event.pageY
			let rect = iconRef.getBoundingClientRect()
			yPos = y - (event.clientY - rect.top) + 1
		}, 100)
	}

	function leaving(event: MouseEvent) {
		setTimeout(() => {
			if (!hasEntered) {
				// @ts-ignore
				if (event.relatedTarget === chartRef || event.relatedTarget?.classList.toString().includes('highcharts')) {
					return
				}
				hovering = false
				hasEntered = false
			}
		}, 100)
	}
</script>

<div class="icon" class:active={hovering} bind:this={iconRef} on:mouseenter={entering} on:mouseleave={leaving}>
	<Icon />
</div>
{#if hovering}
	<!-- Lazy load HoverChart -->
	{#await import('./_HoverChart.svelte') then value}
		<div
			class="wrap"
			style="bottom: calc(100% - {yPos}px); left: {x}px; width: {w}px"
			in:fade={{ delay: 100, duration: 75 }}
			on:mouseenter={() => (hasEntered = true)}
		>
			<svelte:component
				this={value.default}
				bind:ref={chartRef}
				{dates}
				{data}
				bind:hovering
				seriesName={name}
				{range}
			/>
		</div>
	{/await}
{/if}

<style type="text/postcss">
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
		@apply z-50 border-gray-300 bg-white delay-200;
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
		@apply absolute border border-gray-300 bg-white z-20;
	}
</style>
