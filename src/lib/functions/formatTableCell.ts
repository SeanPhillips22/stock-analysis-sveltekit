import type { FormatFunction } from '$lib/components/StockTables/types'

export function formatTableCell(formatFunction: FormatFunction, cell: any) {
	switch (formatFunction) {
		case 'symbol':
			return `<a href="/stocks/${cell.toLowerCase()}/" sveltekit:prefetch>${cell}</a>`

		case 'abbreviate':
			return abbreviate(cell)

		case 'date':
			return formatDate(cell)

		case 'price':
			return formatPrice(cell)

		case 'colorPercentage':
			return colorPercentage(cell)

		case 'string':
			return cell || '-'

		case 'integer':
			return cell ? format(cell, 0) : '-'

		default:
			break
	}
}

export const dec0 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
})

export const dec1 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
})

export const dec2 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})

export const dec3 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 3,
	maximumFractionDigits: 3
})

export function format(value: number, decimals: 0 | 2 | 3) {
	if (!value) return '-'
	if (decimals === 0) return dec0.format(value)
	if (decimals === 2) return dec2.format(value)
	if (decimals === 3) return dec3.format(value)
	return value
}

// Abbreviate a number as B/M/K
export function abbreviate(value: number, noDec?: boolean) {
	if (!value) return '-'

	const formatter = noDec ? dec0 : dec2

	let num = '-'
	if (value >= 1000000000) num = formatter.format(value / 1000000000) + 'B'
	else if (value >= 1000000) num = formatter.format(value / 1000000) + 'M'
	else if (value > 1000) num = formatter.format(value / 1000) + 'K'
	else if (value <= -1000000000) num = formatter.format(value / 1000000000) + 'B'
	else if (value <= -1000000) num = formatter.format(value / 1000000) + 'M'
	else if (value <= -1000) num = formatter.format(value / 1000) + 'K'
	else num = formatter.format(value)

	return num
}

// Format a date
export function formatDate(cell: string) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const dt = new Date(cell)
	return `${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
}

// Format a dollar price
export function formatPrice(cell: number) {
	return cell ? '$' + format(cell, 2) : '-'
}

// Format percentage growth, with color
export function colorPercentage(cell: number) {
	if (!cell) return '-'

	let formatted = format(cell, 2) + '%'

	let divclass = 'rgr'
	if (cell > 0) divclass = 'rg'
	else if (cell < 0) divclass = 'rr'

	return `<div class="${divclass}">${formatted}</div>`
}
