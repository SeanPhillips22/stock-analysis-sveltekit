<script lang="ts">
	import { onMount } from 'svelte'
	import Highcharts from 'highcharts'

	export let ratings: {
		buy: number
		hold: number
		sell: number
		strongBuy: number
		strongSell: number
	}

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
				renderTo: container,
				type: 'column',
				style: {
					fontFamily:
						'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
				}
			},
			title: {
				text: undefined
			},
			xAxis: {
				categories: ['Strong Sell', 'Sell', 'Buy', 'Hold', 'Strong Buy'],
				labels: {
					style: {
						fontSize: '13px',
						color: '#444444',
						fontWeight: '600'
					},
					staggerLines: 1
				}
			},
			yAxis: {
				opposite: true,
				title: {
					text: undefined
				},
				labels: {
					style: {
						fontSize: '13px',
						color: '#323232'
					}
				}
			},
			legend: {
				enabled: false
			},
			series: [
				{
					name: 'Ratings',
					type: 'column',
					groupPadding: 0.1,
					colorByPoint: true,
					data: [ratings.strongSell, ratings.sell, ratings.hold, ratings.buy, ratings.strongBuy],
					colors: ['#FF3333', '#FF3333', '#323232', '#208a20', '#0B610B']
				}
			],
			tooltip: {
				formatter: function () {
					return `${this.point.category}: ${this.y}`
				},
				style: {
					fontSize: '15px'
				}
			},
			credits: {
				enabled: false
			}
		})
	})
</script>

<div class="h-48" bind:this={container} />
