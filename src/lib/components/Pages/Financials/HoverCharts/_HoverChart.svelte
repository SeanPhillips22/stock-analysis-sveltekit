<script lang="ts">
	import { onMount } from 'svelte'
	import Highcharts from 'highcharts'

	export let ref: any
	export let hovering: boolean
	export let dates: string[]
	export let data: number[]
	export let seriesName: string
	export let title: string
	let x = dates // dates.reverse()
	let y = data // data.reverse()

	let container: any

	onMount(() => {
		Highcharts.setOptions({
			lang: {
				numericSymbols: ['K', 'M', 'B', 'T', 'P', 'E']
			},
			plotOptions: {
				series: {
					animation: false
				}
			}
		})

		Highcharts.chart({
			chart: {
				renderTo: ref,
				type: 'column',
				style: {
					fontFamily:
						'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
				}
			},
			title: {
				text: title
			},
			xAxis: {
				categories: x,
				labels: {
					style: {
						fontSize: '12px',
						color: '#323232'
					}
				}
			},
			yAxis: {
				opposite: true,
				title: {
					text: undefined
				},
				labels: {
					style: {
						fontSize: '14px',
						color: '#323232'
					}
				}
			},
			legend: {
				enabled: false
			},
			series: [
				{
					name: seriesName,
					color: '#2C6288',
					type: 'column',
					data: y,
					groupPadding: 0.05,
					animation: false
				}
			],
			credits: {
				enabled: false
			}
		})
	})
</script>

<div class="chart" bind:this={ref} on:mouseleave={() => (hovering = false)} />

<style>
	.chart {
		@apply h-[40vh] w-[95vw] z-50 bg-white p-2 md:h-[330px] md:w-[600px] md:py-2 md:px-3;
	}
</style>
