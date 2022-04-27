<script lang="ts">
	import ChevronDown from '$lib/icons/ChevronDown.svelte'

	export let title: string
</script>

<div class="controls-menu">
	<button class="controls-btn">
		{title}
		<ChevronDown classes="-mr-1 ml-1 h-5 w-5 xs:ml-2" aria-hidden="true" />
	</button>
</div>

<style>
	.controls-menu {
		@apply relative inline-block text-left;
	}
</style>
