<script lang="ts">
	import { data } from '$lib/stores/dataStore'
</script>

{#if $data.executives}
	<h2>Key Executives</h2>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Position</th>
			</tr>
		</thead>
		<tbody>
			{#each $data.executives as executive}
				<tr>
					<td>{executive.Name}</td>
					<td>{executive.Title}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style type="text/postcss">
	h2 {
		@apply mt-6 xs:mt-8 lg:mt-4;
	}

	table {
		@apply mb-6 w-full text-base xs:mb-8;
	}

	thead {
		@apply bg-gray-50;
	}

	thead tr {
		@apply border-y border-gray-200;
	}

	th {
		@apply py-2.5 px-2 text-left font-medium text-gray-800 xs:py-3 xs:px-3 sm:px-4;
	}

	tbody tr {
		@apply border-b border-gray-200;
	}

	tr td:first-child {
		@apply py-2.5 px-2 align-top font-medium text-gray-900 xs:py-3 xs:px-3 sm:px-4;
	}

	tr td:last-child {
		@apply py-2.5 px-2 align-top text-gray-800 xs:py-3 xs:px-3 sm:px-4;
	}
</style>
