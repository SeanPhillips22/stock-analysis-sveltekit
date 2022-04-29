export function formatCell(formatFunction: string, cellContent: any) {
	switch (formatFunction) {
		case 'symbol':
			return `<a href="/stocks/${cellContent.toLowerCase()}/" sveltekit:prefetch>${cellContent}</a>`

		case 'abbreviate':
			return abbreviate(cellContent)

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
