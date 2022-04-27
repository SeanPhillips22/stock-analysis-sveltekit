import type { Sorted, TableData } from './types'

// Sort a column either descending, ascending or not sorted
export function sortColumn(data: TableData, originalData: TableData, sorted: Sorted) {
	const id = Object.keys(sorted)[0]
	if (sorted[id] === 'desc') {
		data.sort((a: any, b: any) => {
			if (a[id] < b[id]) return 1
			if (a[id] > b[id]) return -1
			return 0
		})
	} else if (sorted[id] === 'asc') {
		data.sort((a: any, b: any) => {
			if (a[id] < b[id]) return -1
			if (a[id] > b[id]) return 1
			return 0
		})
	} else {
		return originalData
	}

	return data
}
