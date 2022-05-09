<script lang="ts">
	import LeftRightIcon from '$lib/icons/LeftRight.svelte'
	import { state } from '$lib/stores/financialsStore'
</script>

<button
	class="controls-btn"
	class:active={$state.leftToRight}
	on:click={() => ($state.leftToRight = !$state.leftToRight)}
>
	<LeftRightIcon classes="w-4 bp:w-5 h-4 bp:h-5 pointer-events-none" />
</button>
