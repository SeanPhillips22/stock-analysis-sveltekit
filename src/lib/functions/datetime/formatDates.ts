export const formatDateClean = (string: string) => {
	const datetime = new Date(string)
	const date = datetime.toLocaleString('en-US', {
		day: 'numeric',
		year: 'numeric',
		month: 'short'
	})
	return date
}
