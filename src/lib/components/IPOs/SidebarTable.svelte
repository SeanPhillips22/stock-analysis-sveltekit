<script lang="ts">
	/**
	 * A table in the IPO sidebar that shows a list of stocks with date, symbol and name
	 */
	import Button from '../Buttons/Button.svelte'
	import type { SidebarTableProps } from './ipo.types'

	export let data: SidebarTableProps
	export let title: string
	export let btnTitle: string
	export let btnUrl: string
	export let count: number | undefined = undefined
	export let filed = false
</script>

<div>
	<h3>{count ? `${title} (${count})` : title}</h3>
	<div class="wrap">
		<table>
			<thead>
				<tr>
					<th>{filed ? 'Filed' : 'Date'}</th>
					<th>Symbol</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{#each data as { date, symbol, name } (symbol)}
					<tr>
						<td>{date}</td>
						<td><a href="/stocks/{symbol.toLowerCase()}/">{symbol}</a></td>
						<td>{name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<Button href={btnUrl} title={btnTitle} classes="mt-4" />
</div>

<style type="text/postcss">
	h3 {
		@apply mb-2.5;
	}

	.wrap {
		@apply rounded border border-gray-200;
	}

	table {
		@apply w-full text-left text-[0.95rem] whitespace-nowrap;
	}

	thead tr,
	tr:not(:last-child) {
		@apply border-b border-gray-200;
	}

	tr > * {
		@apply p-2;
	}

	tr > *:not(:last-child) {
		@apply border-r border-gray-200;
	}

	tr > td:last-child {
		@apply max-w-[150px] truncate;
	}
</style>
