<!-- Import and render the stock price charts -->
<!-- TODO make it so that the axes don't update until the data has updated -->
<!-- TODO fix the chart color so that it changes also for other than 1D -->
<script lang="ts">
	import { onMount, afterUpdate, onDestroy } from 'svelte'
	import type { Time, ChartData } from './types'
	import { formatPriceChartTicks, formatPriceChartTime, setPriceChartColor } from './PriceChart.functions'
	import type { IChartApi } from 'lightweight-charts';

	export let time: Time
	export let change: string
	export let close: string
	export let chartData: ChartData
	$: data = chartData

	let chartDiv: HTMLElement

	//
	const handleResize = () => {
		let width = chartDiv.clientWidth
		let height = chartDiv.clientHeight
		chart.applyOptions({ width, height })
		chart.timeScale().fitContent()
	}

	// Render the chart
	let chart: IChartApi
	async function renderChart() {
		if (typeof chart !== 'undefined') chart.remove()
		const { createChart, LineStyle } = await import('lightweight-charts')
		chart = createChart(chartDiv, {
			layout: {
				fontFamily:
					"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
				fontSize: 13,
				textColor: '#323232'
			},
			localization: {
				// timeFormatter controls the crosshair date format.
				timeFormatter: (t: any) => formatPriceChartTime(t, time)
			},

			rightPriceScale: {
				borderColor: '#DEDEDE'
			},

			grid: {
				horzLines: {
					color: '#EEE'
				},
				vertLines: {
					visible: false
				}
			},

			// This object is for date formatting. Setting a month array is faster than having the Date object conjure it up.
			timeScale: {
				...(['1D', '5D', '1M', 'YTD'].includes(time) && {
					// Use TickType to determine whether its hour, day, month or year on the timescale itself
					tickMarkFormatter: (t: any, tickType: any) => formatPriceChartTicks(t, time, tickType)
				}),
				borderColor: '#DEDEDE',
				timeVisible: true,
				fixLeftEdge: true,
				fixRightEdge: true
			},
			handleScroll: false,
			handleScale: false
		})

		let [topColor, bottomColor, lineColor] = setPriceChartColor(Number(change))

		const max = Math.max(
			...data.map((d) => {
				return d.c
			})
		)

		const min = Math.min(
			...data.map((d) => {
				return d.c
			})
		)

		// Configure the main data series of the chart
		const areaSeries = chart.addAreaSeries({
			// Remove this section if you don't want the price line to appear,
			autoscaleInfoProvider: () => ({
				priceRange: {
					minValue: Number(close) < min ? Number(close) : min,
					maxValue: Number(close) > max ? Number(close) : max
				}
			}),
			topColor,
			bottomColor,
			lineColor,
			lineWidth: 2
		})

		time === '1D' && areaSeries.createPriceLine({
			price: Number(close),
			axisLabelVisible: false, // showPriceLineTitle,
			color: 'rgb(100, 100, 100, 1)',
			lineStyle: LineStyle.SparseDotted,
			lineWidth: 1,
			lineVisible: true,
			title: ''
		})

		// Hide the line that shows the current price
		areaSeries.applyOptions({
			priceLineVisible: false
		})

		// Set the data for the chart
		const format: any = data.map((item) => ({
			time: Number(item.t),
			value: item.c
		}))

		areaSeries.setData(format)

		chart.timeScale().fitContent()
	}

	onMount(() => {
		window.addEventListener('resize', handleResize)
	})

	afterUpdate(async () => {
		renderChart()
	})

	onDestroy(() => {
		window.removeEventListener('resize', handleResize)
		if (typeof chart !== 'undefined') chart.remove()
	})
</script>

<div class="h-[250px] sm:h-[300px]" bind:this={chartDiv} />