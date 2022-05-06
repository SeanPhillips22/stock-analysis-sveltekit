export type Statistics = {
	[key in StatisticsKey]: StatisticType
}

export type StatisticsKey =
	| 'valuation'
	| 'dates'
	| 'shares'
	| 'ratios'
	| 'evratios'
	| 'financialPosition'
	| 'financialEfficiency'
	| 'taxes'
	| 'stockprice'
	| 'short'
	| 'income'
	| 'balance'
	| 'cashflow'
	| 'margins'
	| 'dividends'
	| 'splits'
	| 'forecast'

export type StatisticType = {
	data: StatsArray[]
	text: string
}

type StatsArray = [string, string, string, string]

export type StatisticsMap = {
	[key: string]: {
		title: string
		format?: string
		tooltip: string
		formula?: string
		bold?: boolean
		border?: boolean
		indent?: boolean
		extrabold?: boolean
		data?: string
	}
}
