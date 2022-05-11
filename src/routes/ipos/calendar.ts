import { fetchSelect } from '$lib/components/StockTables/fetchSelect'
import type { TableQuery } from '$lib/components/StockTables/types'
import type { RequestHandler } from '@sveltejs/kit'

const queryWeek: TableQuery = {
	index: 'futip',
	main: 'ipoDate',
	sortDirection: 'asc',
	columns: ['ipoDate', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
	filters: ['ipoDate-is-thisweek']
}

const queryLater: TableQuery = {
	index: 'futip',
	main: 'ipoDate',
	sortDirection: 'asc',
	columns: ['ipoDate', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
	filters: ['ipoDate-is-nextweek']
}

export const get: RequestHandler = async () => {
	let extras = ['getIposRecentMin', 'getIpoFilingsMin', 'getFilingsCount']
	const [thisWeek, later] = await Promise.all([fetchSelect(queryWeek, extras), fetchSelect(queryLater)])
	const { data, getIposRecentMin, getIpoFilingsMin, getFilingsCount } = thisWeek
	const { laterData } = later

	if (data) {
		return {
			body: {
				query: queryWeek,
				initialData: data,
				getIposRecentMin,
				getIpoFilingsMin,
				getFilingsCount,
				laterQuery: queryLater,
				laterData: laterData
			}
		}
	}

	return {
		status: 404
	}
}
