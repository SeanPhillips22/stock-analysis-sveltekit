<script lang="ts">
	import { onMount } from 'svelte'
	import Highcharts from 'highcharts'
	import { format } from '$lib/functions/formatTableCell'

	export let title: string
	export let x: string[]
	export let y: number[]
	export let annual = false
	let ref: any

	onMount(() => {
		Highcharts.setOptions({
			plotOptions: {
				series: {
					animation: false,
					dataLabels: {
						enabled: true,
						format: '{point.y:.0f}',
						style: {
							fontSize: annual ? '12px' : '14px',
							fontWeight: '400'
						}
					}
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
					fontSize: '1.4rem',
					fontWeight: '600'
				}
			},
			xAxis: {
				categories: x,
				labels: {
					style: {
						textOverflow: 'none',
						fontSize: '13px',
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
					name: 'IPOs',
					color: '#2C6288',
					type: 'column',
					data: y,
					groupPadding: 0.05,
					animation: false
				}
			],
			tooltip: {
				useHTML: true,
				headerFormat: `<div style="font-size: 18px; font-weight: 600; margin-bottom: 5px;">{point.key}</div>`,
				pointFormatter: function () {
					let y = this.y ? format(this.y, 0).toString() : ''
					return `<div style="font-size: 15px;">IPOs: ${y}</div>`
				}
			},
			credits: {
				enabled: false
			}
		})
	})
</script>

<div class="chart" bind:this={ref} />

<style type="text/postcss">
	.chart {
		@apply mt-4 mb-3 h-[300px] border border-gray-200 p-1 sm:mb-4 sm:h-[390px] sm:p-2;
	}
</style>
