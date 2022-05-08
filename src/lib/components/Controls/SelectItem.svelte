<script lang="ts">
	/*
	 * A checkbox that activates/deactivates a column for the stock table
	 */
	import type { DataId } from '$lib/types/DataId'

	export let id: DataId
	export let name: string
	export let checked: boolean
	export let fixed = false

	let check = checked
</script>

<div class="column-items" class:fixed-option={fixed} title={fixed ? 'This column cannot be unchecked' : ''}>
	<input type="checkbox" checked={check} on:change={() => (check = !check)} disabled={fixed} />
	<label for={id}>{name}</label>
</div>

<style>
	.column-items {
		@apply flex items-center;
	}

	.column-items input {
		@apply h-4 w-4 rounded border border-gray-500 text-blue-600 focus:ring-blue-500;
	}

	.column-items.fixed-option input {
		@apply text-gray-600;
	}

	.column-items label {
		@apply ml-2 whitespace-nowrap text-gray-800;
	}

	.column-items.fixed-option label {
		@apply text-gray-600;
	}
</style>
