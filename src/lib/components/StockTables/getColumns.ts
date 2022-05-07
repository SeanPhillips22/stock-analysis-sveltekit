import type { DataId } from '$lib/types/DataId'
import { DataPoints } from './StockDataPoints'

/**
 * This function formats the columns for the stock table so that the table
 * knows what to do with them.
 */
export function getColumns(cols: DataId[], main: DataId) {
	let newCols = [...cols]

	// Add the "main" column to the front of the array
	if (!newCols.includes(main)) newCols = [main, ...newCols]

	const columns = newCols.map((col) => {
		// destructure the data points
		let { name, colName, format, classes } = DataPoints[col]

		// id: the id of the column, not shown
		// title: the name of the column, shown
		// format: how to format the values of the cells in the column
		// classes: the classes to add to the cells in the column
		return {
			id: col,
			title: colName || name,
			format: format,
			classes
		}
	})

	console.log(columns)

	return columns
}
