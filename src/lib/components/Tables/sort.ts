import type { Sorted, TableData } from './types'
import { DataPoints } from '$lib/components/StockTables/StockDataPoints'
import type { DataId } from '$lib/types/DataId'

// Sort a column either descending, ascending or not sorted
export function sortColumn(data: TableData, sorted: Sorted) {
	const id = Object.keys(sorted)[0] as DataId
	const isDescending = sorted[id] === 'desc'

	// Date Sort
	if (DataPoints[id].format === 'date') {
		return data.sort((a: any, b: any) =>
			isDescending
				? new Date(b[id]).getTime() - new Date(a[id]).getTime()
				: new Date(a[id]).getTime() - new Date(b[id]).getTime()
		)
	}

	// String sort
	if (id === 'n' || id === 's') {
		return data.sort((a: any, b: any) => (isDescending ? b[id].localeCompare(a[id]) : a[id].localeCompare(b[id])))
	}

	// Other sorts
	if (isDescending) {
		return data.sort((a: any, b: any) => {
			if (a[id] < b[id]) return 1
			if (a[id] > b[id]) return -1
			return 0
		})
	} else if (sorted[id] === 'asc') {
		return data.sort((a: any, b: any) => {
			if (a[id] < b[id]) return -1
			if (a[id] > b[id]) return 1
			return 0
		})
	}
}
