import type { Column } from '$lib/components/StockTables/types'
import type { TableData } from '$lib/components/Tables/types'

/**
 * Rewrite table data to make it ready for export
 * Each row in the table is an array of items
 * The first row is an array of the column names
 * The other rows are arrays of the cell values
 */
export function parseExportData(columns: Column[], data: TableData) {
	let newData = []

	// The columns
	newData[0] = columns.map((column) => column.title)
	let columnIds = columns.map((column) => column.id)

	// The data rows
	data.forEach((item: { [x: string]: any }) => {
		let arr = columnIds.map((id) => item[id])
		newData.push(arr)
	})

	return newData
}
