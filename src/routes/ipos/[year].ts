import { getSelect } from '$lib/components/StockTables/getSelect'
import type { TableDynamic } from '$lib/components/StockTables/types'
import type { RequestHandler } from '@sveltejs/kit'

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'histip',
	main: 'ipoDate',
	sort: [{ id: 'ipoDate', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'ipp', 'ippc', 'ipr']
}

export const get: RequestHandler = async ({ params }) => {
	const year = params.year
	console.log('in year endpoint', year)

	if (['2022', '2021', '2020', '2019'].includes(year)) {
		let extraFn = 'getIpoInfo' + year
		let extras = ['getIpoCalendarDataMin', 'getIpoNewsMin', extraFn]
		let filters = [`ipoDate-year-${year}`]
		let queryObject = { ...query, filters }

		const data = await getSelect(queryObject, extras)

		if (data) {
			return {
				body: {
					initialData: data.data,
					getIpoCalendarDataMin: data.getIpoCalendarDataMin,
					getIpoNewsMin: data.getIpoNewsMin,
					year,
					info: data[extraFn]
				}
			}
		}
	}

	return {
		status: 404
	}
}
