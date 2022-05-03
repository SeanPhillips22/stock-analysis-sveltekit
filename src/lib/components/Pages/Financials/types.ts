import type { DataId } from '$lib/types/DataId'

export type FinancialData = {
	[key: string]: any[]
}

export type Statement = 'income-statement' | 'balance-sheet' | 'cash-flow-statement' | 'ratios'

export type Range = 'annual' | 'quarterly' | 'trailing'

export type FinancialsMap = {
	id: string
	title: string
	tooltipTitle?: string
	tooltip?: string
	format?: 'percentage' | 'pershare' | 'ratio' | 'growth' | 'inverted-growth' | 'reduce_precision'
	formula?: string
	class?: string
}
