<script lang="ts">
	import { info } from '$lib/stores/infoStore'
	import { data } from '$lib/stores/dataStore'
</script>

<div class="wrap">
	<div class="name">{$info.nameFull}</div>
	{#if $data?.logo?.src}
		<div class="mb-2">
			<img
				src={$data.logo.src}
				width={$data.logo.width}
				height={$data.logo.height}
				alt={$data.logo.alt}
				class="mx-auto py-1"
			/>
		</div>
	{/if}
	<table>
		<tbody>
			{#if $data?.info?.country}
				<tr>
					<td>Country</td>
					<td>{$data.info.country}</td>
				</tr>
			{/if}
			{#if $data?.info?.founded}
				<tr>
					<td>Founded</td>
					<td>{$data.info.founded}</td>
				</tr>
			{/if}
			{#if $data?.info?.ipoDate}
				<tr>
					<td>Ipo Date</td>
					<td>{$data.info.ipoDate}</td>
				</tr>
			{/if}
			{#if $data?.info?.industry}
				<tr>
					<td>Industry</td>
					<td>{$data.info.industry}</td>
				</tr>
			{/if}
			{#if $data?.info?.sector && $data?.info.sector !== 'Blank Check / SPAC'}
				<tr>
					<td>Sector</td>
					<td>{$data.info.sector}</td>
				</tr>
			{/if}
			{#if $data?.info?.employees}
				<tr>
					<td>Employees</td>
					<td>{$data.info.employees}</td>
				</tr>
			{/if}
			{#if $data?.info?.ceo}
				<tr>
					<td>CEO</td>
					<td>{$data.info.ceo}</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<style type="text/postcss">
	.wrap {
		@apply mt-7 rounded border border-gray-200 bg-gray-50 px-3 pt-3 pb-2 xs:px-4 xs:pt-4 lg:mt-1;
	}

	.name {
		@apply pb-3 text-center text-2xl font-semibold;
	}

	table {
		@apply w-full;
	}

	tr:not(:last-child) {
		@apply border-b border-gray-200;
	}

	td {
		@apply py-1.5 px-1 lg:py-2;
	}

	td:first-child {
		@apply font-semibold;
	}

	td:last-child {
		@apply text-right;
	}
</style>
