/**
 * Turn a date string into the plain year
 */
export function formatYear(date: string | number, statement?: string) {
	if (date === 'TTM') return statement === 'ratios' ? 'Current' : 'TTM'

	const dateObject = new Date(date)
	let year = dateObject.getFullYear()
	const month = dateObject.getMonth()
	// If fiscal year ends in Jan-Mar, show year as previous

	if (month < 4) {
		year--
	}
	return year
}

/**
 * Formatters to prevent creating new objects many times
 */
const zeroTwo = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2
})

const zeroZero = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
})

export const formatNumber = (num: number, decimals: 'zeroTwo' | 'zeroZero', append = '') => {
	if (decimals === 'zeroTwo') {
		return zeroTwo.format(num) + append
	}

	if (decimals === 'zeroZero') {
		return zeroZero.format(num) + append
	}
}

/**
 * Format the financial numbers in the cells
 */
export function formatCell(type = 'standard', current: number | null, divider: number, isHover = false) {
	if (current === null) return '-'

	const decimals = divider === 1 ? 3 : 2

	switch (type) {
		case 'standard':
			return formatNumber(current / divider, 'zeroTwo')

		case 'reduce_precision': {
			if (current) {
				return formatNumber(current / divider, 'zeroZero')
			}
			return '-'
		}

		case 'percentage': {
			return (current * 100).toFixed(decimals) + '%'
		}

		case 'growth': {
			if (current > 0) {
				return `<span class="text-green-700">${(current * 100).toFixed(decimals) + '%'}</span>`
			}
			if (current < 0) {
				return `<span class="text-red-600">${(current * 100).toFixed(decimals) + '%'}</span>`
			}
			return '-'
		}

		// Colors are inverted (when lower is better, for example shares out change)
		case 'inverted-growth': {
			if (current > 0) {
				return `<span class="text-red-600">${(current * 100).toFixed(decimals) + '%'}</span>`
			}
			if (current < 0) {
				return `<span class="text-green-700">${(current * 100).toFixed(decimals) + '%'}</span>`
			}
			return '-'
		}

		case 'pershare': {
			if (current) {
				return current.toFixed(decimals)
			}
			return '-'
		}

		case 'ratio': {
			if (current === 0) return '0'
			if (current) {
				return divider === 1 || isHover
					? (Math.round(current * 1000) / 1000).toFixed(3)
					: (Math.round(current * 100) / 100).toFixed(2)
			}
			return '-'
		}

		default:
			return ''
	}
}
