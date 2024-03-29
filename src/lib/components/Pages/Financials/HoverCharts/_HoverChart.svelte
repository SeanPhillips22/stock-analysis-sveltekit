<script lang="ts">
	import { info } from '$lib/stores/infoStore'
	import { onMount } from 'svelte'
	import Highcharts from 'highcharts'
	import type { Range } from '../types'
	import { formatYear } from '../functions'
	import { capitalize } from '$lib/functions/utils/capitalize'
	import { state } from '$lib/stores/financialsStore'

	export let ref: any // container for chart
	export let hovering: boolean // if hovering over icon or chart
	export let dates: string[]
	export let data: number[]
	export let seriesName: string
	export let range: Range

	onMount(() => {
		// Copy the arrays to prevent mutation
		// of the original
		let chartDates: any[] = [...dates]
		let chartData = [...data]

		// Reverse the array order
		// TODO later, if reverse order is set then don't do this
		chartData.reverse()
		if (!$state.leftToRight) {
			chartDates.reverse()
		}

		// Format the x-axis values to be years
		// if range is annual
		if (range === 'annual') {
			chartDates = chartDates.map((m) => formatYear(m))
		}

		let title = `${$info.symbol.toUpperCase()} ${seriesName} (${capitalize(range)})`

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
				text: title,
				style: {
					fontSize: '1.2rem',
					fontWeight: '600'
				}
			},
			xAxis: {
				categories: chartDates,
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
					data: chartData,
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

<style type="text/postcss">
	.chart {
		@apply h-[40vh] z-50 bg-white p-2 md:h-[330px] md:py-2 md:px-3;
	}
</style>
