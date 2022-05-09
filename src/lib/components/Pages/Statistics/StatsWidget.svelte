<script lang="ts">
	import { data } from '$lib/stores/dataStore'
	import { getContext } from 'svelte'

	import Popover from '$lib/components/Popover/_Popover.svelte'
	import StatsTooltip from './StatsTooltip.svelte'
	import type { StatisticsKey, StatisticsMap } from './types'

	export let title: string
	export let key: StatisticsKey

	let map: StatisticsMap = getContext('statistics_map')
</script>

<h2>{title}</h2>
{#if $data[key]?.text}
	<p>{$data[key].text}</p>
{/if}
<table>
	<tbody>
		{#if $data[key]?.data.length}
			{#each $data[key]?.data as item}
				{@const tooltip = map[item[0]]}
				<tr>
					<td>
						<Popover>
							<StatsTooltip slot="content" {tooltip} />
							{item[1]}
						</Popover>
					</td>
					<td title={item[3]}>{item[2]}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style type="text/postcss">
	h2 {
		@apply mb-2 px-0.5 text-xl font-bold text-gray-900 xs:text-[1.3rem];
	}

	p {
		@apply mb-4 px-0.5 text-base leading-relaxed text-gray-900 xs:text-[1.05rem] lg:leading-normal;
	}

	table {
		@apply w-full;
	}

	tr {
		@apply border-y border-gray-200;
	}

	tr td {
		@apply py-1.5 px-[5px] xs:py-2 xs:px-2.5;
	}

	tr td:last-child {
		@apply text-right font-semibold;
	}

	tr:nth-child(odd) {
		background-color: rgba(249, 250, 251, 1);
	}
</style>
