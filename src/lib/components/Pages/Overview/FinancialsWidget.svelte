<script lang="ts">
	import { onMount } from 'svelte'
	import Highcharts from 'highcharts'

	let container: any

	onMount(() => {
		Highcharts.chart({
			chart: {
				renderTo: container,
				type: 'column'
			},
			title: {
				text: 'Fruit Consumption'
			},
			xAxis: {
				categories: ['Apples', 'Bananas', 'Oranges']
			},
			yAxis: {
				title: {
					text: 'Fruit eaten'
				}
			},
			series: [
				{
					name: 'Jane',
					type: 'column',
					data: [1, 0, 4]
				},
				{
					name: 'John',
					type: 'column',
					data: [5, 7, 3]
				}
			]
		})
	})
</script>

<div bind:this={container} />
