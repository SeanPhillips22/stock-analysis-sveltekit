import { getSelect } from '$lib/components/StockTables/getSelect'
import type { TableDynamic } from '$lib/components/StockTables/types'
import type { RequestHandler } from '@sveltejs/kit'

const query: TableDynamic = {
	index: 'histip',
	main: 'ipoDate',
	count: 200,
	sort: [{ id: 'ipoDate', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'ipp', 'ippc', 'ipr']
}

export const get: RequestHandler = async () => {
	console.log('in index endpoint')

	let extras = ['getIpoCalendarDataMin', 'getIpoNewsMin']
	const data = await getSelect(query, extras)

	if (data) {
		return {
			body: {
				initialData: data.data,
				getIpoCalendarDataMin: data.getIpoCalendarDataMin,
				getIpoNewsMin: data.getIpoNewsMin
			}
		}
	}

	return {
		status: 404
	}
}
