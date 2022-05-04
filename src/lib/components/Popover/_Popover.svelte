<script lang="ts">
	import { fade } from 'svelte/transition'

	let container: any
	let hovering = false
	let x: number
	let y: number
	let w: number
	let a: string // arrow position

	function entering(event: MouseEvent) {
		hovering = true
		let rect = container.getBoundingClientRect()
		if (window?.innerWidth < 500) {
			x = 15
			w = window.innerWidth - 30
			a = rect.x + rect.width / 2 - x + 'px'
		} else {
			x = rect.x + rect.width / 2 - 200
			w = 400
			a = '200px'
		}
		y = event.pageY - (event.clientY - rect.top) - 5
	}

	function leaving() {
		hovering = false
	}
</script>

<span bind:this={container} on:mouseenter={entering} on:mouseleave={leaving}>
	<slot />
</span>

{#if hovering}
	<div
		class="popover"
		style="bottom: calc(100% - {y}px); left: {x}px; width: {w}px; --arrow-position:{a}"
		in:fade={{ delay: 200, duration: 75 }}
	>
		<slot name="content" />
	</div>
{/if}

<style>
	.popover {
		@apply absolute bg-white p-3 z-50 border border-gray-200 rounded-md shadow-md;
	}

	.popover:after {
		content: '';
		position: absolute;
		top: 100%;
		left: var(--arrow-position);
		margin-left: -8px;
		border-width: 8px;
		border-style: solid;
		border-color: white transparent transparent transparent;
	}
</style>
