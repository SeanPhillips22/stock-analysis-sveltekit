import { fetchSelect } from '$lib/components/StockTables/fetchSelect'
import type { TableQuery } from '$lib/components/StockTables/types'
import type { RequestHandler } from '@sveltejs/kit'

// the initial config for the select endpoint to fetch data
let query: TableQuery = {
	index: 'histip',
	main: 'ipoDate',
	sortDirection: 'desc',
	columns: ['s', 'n', 'ipp', 'ippc', 'ipr']
}

export const get: RequestHandler = async ({ params }) => {
	const year = params.year

	if (['2022', '2021', '2020', '2019'].includes(year)) {
		let extraFn = 'getIpoInfo' + year
		let extras = ['getIpoCalendarDataMin', 'getIpoNewsMin', extraFn]
		let filters = [`ipoDate-year-${year}`]
		query = { ...query, filters }

		const json = await fetchSelect(query, extras)
		const { data, getIpoCalendarDataMin, getIpoNewsMin } = json

		if (data) {
			return {
				body: {
					query,
					initialData: data,
					getIpoCalendarDataMin,
					getIpoNewsMin,
					year,
					info: json[extraFn]
				}
			}
		}
	}

	return {
		status: 404
	}
}
