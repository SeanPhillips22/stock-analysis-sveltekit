<script lang="ts">
	let hovering = false
	let x: number
	let y: number

	function entering(event: MouseEvent) {
		hovering = true
		x = event.pageX + 5
		y = event.pageY + 5
	}

	function leaving() {
		hovering = false
	}
</script>

<div class="container">
	<span on:mouseenter={entering} on:mouseleave={leaving}>
		<slot />
	</span>
	{#if hovering}
		<div class="popover" style="bottom: calc(100% - {y + -20}px); left: {x - 50}px;">
			<slot name="content" />
		</div>
	{/if}
</div>

<style>
	.container {
		@apply inline;
	}

	.popover {
		@apply absolute bg-white p-3 z-50 shadow;
		/* position: absolute;
		top: calc(100% + 5px);
		left: calc(50% - 100px);
		width: 200px;
		background: #fff;
		border-radius: 5px;
		padding: 10px;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
		z-index: 1; */
	}
</style>
