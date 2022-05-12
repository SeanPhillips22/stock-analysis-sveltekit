<script lang="ts">
	import StatsChart from './StatsChart.svelte'

	export let title: string
	export let data: [string, number][]

	export const x = data.map((month) => {
		return month[0]
	})

	export const y = data.map((month) => {
		return month[1]
	})
</script>

<StatsChart {title} {x} {y} />
