<script lang="ts">
	import { state } from '$lib/stores/financialsStore'
	import Dropdown from '$lib/components/Dropdown/_Dropdown.svelte'
	import Check from '$lib/icons/Check.svelte'
</script>

<Dropdown title={$state.divider}>
	<div class="dd" class:active={$state.divider === 'Billions'} on:click={() => ($state.divider = 'Billions')}>
		Billions
		{#if $state.divider === 'Billions'}
			<Check classes="h-5 w-5" />
		{/if}
	</div>
	<div class="dd" class:active={$state.divider === 'Millions'} on:click={() => ($state.divider = 'Millions')}>
		Millions
		{#if $state.divider === 'Millions'}
			<Check classes="h-5 w-5" />
		{/if}
	</div>
	<div class="dd" class:active={$state.divider === 'Thousands'} on:click={() => ($state.divider = 'Thousands')}>
		Thousands
		{#if $state.divider === 'Thousands'}
			<Check classes="h-5 w-5" />
		{/if}
	</div>
	<div class="dd" class:active={$state.divider === 'Raw'} on:click={() => ($state.divider = 'Raw')}>
		Raw
		{#if $state.divider === 'Raw'}
			<Check classes="h-5 w-5" />
		{/if}
	</div>
</Dropdown>
