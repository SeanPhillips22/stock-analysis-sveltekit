<script lang="ts">
	import { onMount, afterUpdate, onDestroy } from 'svelte'
	import { Chart, ArcElement, DoughnutController, Tooltip } from 'chart.js'

	import type { Forecast } from '$lib/types/Forecast'

	export let data: Forecast

	Chart.register(ArcElement, Tooltip, DoughnutController)

	const recs = data.data.recommendations
	const latest = recs[recs.length - 1] ?? null
	const { angle } = recs[recs.length - 1] ?? 0

	type IDs = 'strongSell' | 'sell' | 'hold' | 'buy' | 'strongBuy'

	const labels = ['Strong Sell', 'Sell', 'Hold', 'Buy', 'Strong Buy']

	const labelIds: { name: string; id: IDs }[] = [
		{ name: 'Strong Sell', id: 'strongSell' },
		{ name: 'Sell', id: 'sell' },
		{ name: 'Hold', id: 'hold' },
		{ name: 'Buy', id: 'buy' },
		{ name: 'Strong Buy', id: 'strongBuy' }
	]

	const d = [
		{
			data: [10, 10, 10, 10, 10],
			backgroundColor: [
				'rgb(148, 49, 38)',
				'rgb(203, 67, 53)',
				'rgb(204, 204, 0)',
				'rgb(67, 175, 29)',
				'rgb(0, 153, 0)'
			],
			borderColor: ['rgb(119, 21, 17)', 'rgb(172, 37, 31)', 'rgb(174, 177, 0)', 'rgb(29, 148, 0)', 'rgb(0, 136, 0)'],
			borderWidth: 1
		}
	]

	let chartCanvas: any
	let chart: any = null

	let chartOptions = {
		maintainAspectRatio: false,
		animation: {
			duration: 0 // general animation time
		},
		radius: '70%',
		cutout: '65%',
		rotation: 270,
		circumference: 180,

		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: true,
				titleFont: {
					size: 17,
					weight: '600'
				},
				bodyFont: {
					size: 16,
					weight: '400'
				},
				callbacks: {
					title: function (tooltipItem: any) {
						return tooltipItem[0].label
					},
					label: function (context: any) {
						let label = context.label || ''
						let findId = labelIds.find((x) => x.name === label)
						let id: IDs = findId ? findId.id : 'hold'
						let value = latest ? latest[id] : 0
						return ` ${value}`
					}
				}
			}
		}
	}
	const chartPlugins = [
		{
			id: '2',
			afterDatasetsDraw: function (chart: any) {
				if (!angle) return
				const chartInstance = chart
				const ctx = chartInstance.ctx

				const radianAngle = ((angle - 180) * Math.PI) / 180

				const radius = 80
				const cw = chartInstance.chartArea.width
				const ch = chartInstance.chartArea.height
				const cx = cw / 2
				const cy = ch - ch / 4 - 23

				ctx.translate(cx, cy)
				ctx.rotate(radianAngle)
				ctx.beginPath()
				ctx.moveTo(0, -5)
				ctx.lineTo(radius, 0)
				ctx.lineTo(0, 5)
				ctx.fillStyle = 'rgba(64, 64,64)'
				ctx.fill()
				ctx.rotate(-radianAngle)
				ctx.translate(-cx, -cy)
				ctx.beginPath()
				ctx.arc(cx, cy, 7, 0, Math.PI * 2)
				ctx.fill()
			}
		}
	]

	onMount(() => {
		chart = new Chart(chartCanvas, {
			type: 'doughnut',
			data: {
				labels: labels,
				datasets: d
			},
			plugins: chartPlugins,
			options: chartOptions
		})
	})

	afterUpdate(() => {
		if (!chart) return
		;(chart.data = {
			labels: labels,
			datasets: d
		}),
			(chart.type = 'doughnut')
		chart.options = chartOptions
		chart.plugins = chartPlugins
		chart.update()
	})

	onDestroy(() => {
		if (chart) chart.destroy()
		chart = null
	})
</script>

<div class="h-72 w-72">
	<canvas bind:this={chartCanvas} id="myChart" />
</div>
