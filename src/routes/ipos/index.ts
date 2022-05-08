import { fetchSelect } from '$lib/components/StockTables/fetchSelect'
import type { TableQuery } from '$lib/components/StockTables/types'
import type { RequestHandler } from '@sveltejs/kit'

const query: TableQuery = {
	index: 'histip',
	main: 'ipoDate',
	count: 200,
	sort: [{ id: 'ipoDate', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'ipp', 'ippc', 'ipr']
}

export const get: RequestHandler = async () => {
	let extras = ['getIpoCalendarDataMin', 'getIpoNewsMin']
	const json = await fetchSelect(query, extras)
	const { data, getIpoCalendarDataMin, getIpoNewsMin } = json

	if (data) {
		return {
			body: {
				query,
				initialData: data,
				getIpoCalendarDataMin,
				getIpoNewsMin
			}
		}
	}

	return {
		status: 404
	}
}
