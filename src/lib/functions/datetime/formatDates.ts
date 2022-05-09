export const formatDateClean = (string: string) => {
	const datetime = new Date(string)
	const date = datetime.toLocaleString('en-US', {
		day: 'numeric',
		year: 'numeric',
		month: 'short'
	})
	return date
}

export const formatMonthLong = (string: string) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	const dt = new Date(string)
	return `${months[dt.getMonth()]} ${dt.getFullYear()}`
}
