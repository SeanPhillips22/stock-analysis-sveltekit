// Fetch chart data
export async function fetchChartData(symbol, type, time) {
	let params = `chart?s=${symbol}&t=${type}&r=${time}&m=1`

	if (time === '5Y' || time === 'MAX') {
		params += '&p=w'
	}
	try {
		const res = await fetch(
			'https://api.stockanalysis.com/wp-json/sa/' + params,
		)
		return await res.json()
	} catch (e) {
		console.error(e)
	}
}

// Turn the 1D/5D into a human-friendly string
export function translateTime(time) {
	switch (time) {
		case '1D':
			return '1-day'
		case '5D':
			return '5-day'
		case '1M':
			return '1-month'
		case 'YTD':
			return 'year-to-date'
		case '1Y':
			return '1-year'
		case '5Y':
			return '5-year'
		case 'MAX':
			return 'all-time'
	}
	return ''
}

export function getPriceChange(data) {
	if (!data) return 0
	const first = data[0]?.c
	const last = data[data.length - 1]?.c
	if (last != undefined) {
		return first ? last / first - 1 : 0
	}
	return 0
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Format the date that shows in the crosshair when hovering over the chart
 */
export function formatPriceChartTime(t, time) {
	const date = new Date(t * 1000)

	if (time == '1D' || time == '5D') {
		let hours = date.getUTCHours()
		let minutes = date.getUTCMinutes()
		let ampm = hours >= 12 ? 'pm' : 'am'
		hours = hours % 12 ? hours : 12
		minutes = minutes < 10 ? '0' + minutes : minutes
		return (
			monthNames[date.getUTCMonth()] +
			' ' +
			date.getUTCDate() +
			', ' +
			date.getUTCFullYear() +
			' ' +
			hours +
			':' +
			minutes +
			' ' +
			ampm
		)
	} else if (time == '1M' || time == 'YTD' || time == '1Y') {
		return monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear()
	} else {
		return 'Week Of ' + monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear()
	}
}

/**
 * Format the date to be displayed in the ticks of the x-axis of the chart
 * @param t timestamp in seconds, needs to be multiplied by 1000
 * @param time the time range selected (1D, 1M, etc)
 * @param tickType
 * @returns
 */
export function formatPriceChartTicks(t, time, tickType) {
	const date = new Date(t * 1000)

	if (time == '1D') {
		let hours = date.getUTCHours() //UTC must since date localizes the inputs based on your browser.
		let minutes = date.getUTCMinutes()
		let ampm = hours >= 12 ? 'pm' : 'am'
		hours = hours % 12 ? hours : 12
		minutes = minutes < 10 ? '0' + minutes : minutes
		return minutes != '00' ? hours + ':' + minutes + ' ' + ampm : hours + ' ' + ampm
	} else if (time == '5D') {
		return monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate()
	} else {
		if (tickType == 2) {
			return monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate()
		}
		return monthNames[date.getUTCMonth()]
	}
}

/**
 * Set the color of the chart line and area
 */
export function setPriceChartColor(change) {
	if (change > 0) return ['rgba(4, 120, 87, 0.56)', 'rgba(4, 120, 87, 0.04)', 'rgba(4, 120, 87, 1)']

	if (change < 0) return ['rgba(220, 38, 38, 0.56)', 'rgba(220, 38, 38, 0.04)', 'rgba(220, 38, 38, 1)']

	return ['rgba(33, 150, 243, 0.56)', 'rgba(33, 150, 243, 0.04)', 'rgba(33, 150, 243, 1)']
}
