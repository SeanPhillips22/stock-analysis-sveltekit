import type { FilterValue, ScreenerTypes, SortObject } from '$lib/components/Screener/types'
import type { DataId } from '$lib/types/DataId'

// Create a type that is an array of objects with keys as DataID
export type TableData = { [key in DataId]: any }[]

// The table's fixed properties
export type TableFixed = {
	defaultSort?: SortObject[] // The default sort order

	// The controls options to show
	controls?: {
		results?: boolean // Number of results
		filter?: boolean // Show a filter input
		export?: boolean // Export button
		columns?: boolean // Columns dropdown
		options?: boolean // More options
	}

	hideOpenInScreener?: boolean // Hide the open in screener button
	pagination?: boolean // Enable pagination
	resultsCount?: number // The total number of available results
	columnOptions?: DataId[] // The columns available to select
	includeColumns?: DataId[] // Columns to include
	excludeColumns?: DataId[] // Columns to exclude
	columnOrder?: DataId[] // The order of the columns
	fixedColumns?: DataId[] // The columns that can not be removed
	screener?: {
		type: ScreenerTypes
		filters: FilterValue[]
		sort?: SortObject[]
		showResultsMenu?: boolean
		showColumns?: DataId[]
	}

	// Fallback if no data is found
	fallback?: {
		title: string
		text: string
	}
}

// Dynamic data that becomes state and is used to modify the table
export type TableDynamic = {
	index: IndexTypes // The index type, more specific is faster

	main: DataId // The main column to sort by

	count?: number | null // The number of symbols to show -- if empty, show all

	sort?: SortObject[] // What is currently sorted by
	sortDirection: 'desc' | 'asc' // The sort order

	columns: DataId[] // The columns to show

	filters?: string[] // The filters to apply

	fetched?: boolean // Whether the original data has been fetched

	showOnMobile?: boolean // Whether to show the controls on mobile

	page?: number // pagination can get appended to the object

	dedupe?: boolean // whether to remove duplicate symbols from the table
}

// The stock index type (more specific is faster)
export type IndexTypes = 'allstocks' | 'stocks' | 'etf' | 'histip' | 'futip'
