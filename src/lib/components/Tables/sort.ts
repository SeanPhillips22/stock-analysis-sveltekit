import type { Sorted, TableData } from './types'

// Sort a column either descending, ascending or not sorted
export function sortColumn(data: TableData, originalData: TableData, id: string, sorted: Sorted) {
	// If the column was not sorted, sort it as descending
	if (typeof sorted === 'undefined' || typeof sorted[id] === 'undefined') {
		data.sort((a: any, b: any) => {
			if (a[id] < b[id]) return 1
			if (a[id] > b[id]) return -1
			return 0
		})
		sorted[id] = 'desc'
		// If the column is sorted as descending, sort it as ascending
	} else if (sorted[id] === 'desc') {
		data.sort((a: any, b: any) => {
			if (a[id] < b[id]) return -1
			if (a[id] > b[id]) return 1
			return 0
		})
		sorted[id] = 'asc'
		// If the column is sorted as ascending, reset the data to its original unsorted state
	} else if (sorted[id] === 'asc') {
		sorted = {}
		return { returnedData: originalData, returnedSorted: sorted }
	}

	return { returnedData: data, returnedSorted: sorted }
}
