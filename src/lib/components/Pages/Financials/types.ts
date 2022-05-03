import type { DataId } from '$lib/types/DataId'

export type FinancialData = {
	[key: string]: any[]
}

export type Statement = 'income' | 'balance-sheet' | 'cash-flow-statement' | 'ratios'

export type Range = 'annual' | 'quarterly' | 'trailing'

export type FinancialsMap = {
	title: string
	tooltipTitle?: string
	tooltip?: string
	bold?: boolean
	extrabold?: boolean
	data?: string
	format?: string
	formula?: string
	indent?: boolean
	border?: boolean
	class?: string
	id:
		| DataId
		| 'cor'
		| 'gp'
		| 'sgna'
		| 'rnd'
		| 'otheropex'
		| 'opex'
		| 'opinc'
		| 'intexp'
		| 'interestIncome'
		| 'interestExpense'
		| 'otherincome'
		| 'pretax'
		| 'taxexp'
		| 'netinc'
		| 'prefdivis'
		| 'netinccmn'
		| 'shareswa'
		| 'shareswadil'
		| 'shareschange'
		| 'epsdil'
		| 'fcfps'
		| 'taxrate'
		| 'depamor'
}
