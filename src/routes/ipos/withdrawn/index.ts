import { fetchSelect } from '$lib/components/StockTables/fetchSelect'
import type { TableQuery } from '$lib/components/StockTables/types'
import type { RequestHandler } from '@sveltejs/kit'

const query: TableQuery = {
	index: 'futip',
	main: 'withdrawnDateFB',
	sortDirection: 'desc',
	columns: ['s', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
	filters: ['ipoStatus-is-withdrawn']
}

export const get: RequestHandler = async () => {
	let extras = ['getIposRecentMin', 'getIpoNewsMin']
	const json = await fetchSelect(query, extras)
	const { data, getIposRecentMin, getIpoNewsMin } = json

	if (data) {
		return {
			body: {
				query,
				initialData: data,
				getIposRecentMin,
				getIpoNewsMin
			}
		}
	}

	return {
		status: 404
	}
}
