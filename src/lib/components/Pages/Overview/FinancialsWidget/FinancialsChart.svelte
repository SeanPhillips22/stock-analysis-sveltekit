<script lang="ts">
	/**
	 * A chart shown on the stock overview pages that displays revenue and earnings
	 *
	 * TODO make lazy loaded and only render client-side
	 */
	import { onDestroy, onMount } from 'svelte'
	import Highcharts from 'highcharts'
	import { format } from '$lib/components/Tables/formatCell'

	export let data: any

	let xAxis = data[0]
	let revenue = data[1]
	let earnings = data[2]
	let colors = earnings.map((i: number) => {
		if (i > 0) {
			return '#00853E'
		} else if (i < 0) {
			return '#CD5C5C'
		} else {
			return '#555555'
		}
	})

	let legendColor = colors[colors.length - 1]

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
			exporting: {
				enabled: true
			},
			title: {
				text: undefined
			},
			xAxis: {
				categories: xAxis,
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
			series: [
				{
					name: 'Revenue',
					color: '#2C6288',
					type: 'column',
					data: revenue,
					groupPadding: 0.05,
					animation: false,
					states: {
						inactive: {
							opacity: 0.7
						}
					}
				},
				{
					name: 'Earnings',
					color: legendColor,
					id: 'Earnings',
					type: 'column',
					grouping: false
				},
				{
					name: 'Earnings',
					linkedTo: 'Earnings',
					colorByPoint: true,
					colors: colors,
					type: 'column',
					data: earnings,
					groupPadding: 0.05,
					states: {
						inactive: {
							opacity: 0.7
						}
					}
				}
			],
			legend: {
				verticalAlign: 'top',
				itemStyle: {
					fontWeight: 'normal',
					fontSize: '15px'
				},
				symbolHeight: 15,
				symbolWidth: 15,
				symbolRadius: 0
			},
			tooltip: {
				useHTML: true,
				headerFormat: `<div style="font-size: 18px; font-weight: 600; margin-bottom: 5px;">{point.key}</div>`,
				pointFormatter: function () {
					let y = this.y ? format(this.y, 0).toString() : ''
					return `<div style="font-size: 15px;">${y}</div>`
				}
			}
		})
	})
</script>

<div class="border rounded-sm h-72" bind:this={container} />
