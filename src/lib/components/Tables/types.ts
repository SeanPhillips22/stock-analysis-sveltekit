// A single table column
export type Column = {
	id: string // The unique identifier for the column
	title: string // The title of the column
	format?: string // How to format the cell content
	class?: string // Classes to add to the cells
}

// Data for a table
export type TableData = { [key: string]: string | number }[]

// The sorted object that keeps track of the sorted state
export type Sorted = {
	[key: string]: 'desc' | 'asc'
}

// The config for the table
export type TableConfig = {
	sortable?: boolean
	controls?: {
		filter?: boolean
		export?: boolean
	}
}
