<script lang="ts">
	import { data } from '$lib/stores/dataStore'
	$: contact = $data.contact
</script>

<h2>Contact Details</h2>
<div class="wrap">
	<table>
		<tbody>
			{#if contact?.address}
				<tr>
					<td colspan="2" class="pb-3">
						<div class="mb-2 text-lg font-bold">Address:</div>
						<div>{@html contact.address}</div>
					</td>
				</tr>
			{/if}
			{#if contact?.phone}
				<tr>
					<td class="py-2 px-0.5 font-semibold">Phone</td>
					<td class="py-2 px-0.5 text-right">{contact.phone}</td>
				</tr>
			{/if}
			{#if contact?.website && contact?.domain}
				<tr>
					<td class="py-2 px-0.5 font-semibold">Website</td>
					<td class="py-2 px-0.5 text-right">
						<a href={contact.website} target="_blank" rel="noopener noreferrer nofollow">
							{contact.domain.length > 30 ? 'Visit Website' : contact.domain}
						</a>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<style type="text/postcss">
	h2 {
		@apply mt-6 xs:mt-8;
	}

	.wrap {
		@apply rounded border border-gray-200 bg-gray-50 px-4 pt-4 pb-2;
	}

	table {
		@apply w-full;
	}

	tr:not(:last-child) {
		@apply border-b border-gray-200;
	}
</style>
