/**
 * Turn a date string into the plain year
 */
export function formatYear(date: string | number, statement?: string) {
	if (date === 'TTM') return statement === 'ratios' ? 'Current' : 'TTM'

	const dateObject = new Date(date)
	let year = dateObject.getFullYear()
	const month = dateObject.getMonth()
	// If fiscal year ends in Jan-Mar, show year as previous

	if (month < 4) {
		year--
	}
	return year
}

/**
 * Formatters to prevent creating new objects many times
 */
const zeroTwo = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2
})

const zeroZero = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
})

export const formatNumber = (num: number, decimals: 'zeroTwo' | 'zeroZero', append = '') => {
	if (decimals === 'zeroTwo') {
		return zeroTwo.format(num) + append
	}

	if (decimals === 'zeroZero') {
		return zeroZero.format(num) + append
	}
}

/**
 * Format the financial numbers in the cells
 */
export function formatCell(type = 'standard', current: number | null, divider: number, isHover = false) {
	if (current === null) return '-'

	const decimals = divider === 1 ? 3 : 2

	switch (type) {
		case 'standard':
			return formatNumber(current / divider, 'zeroTwo')

		case 'reduce_precision': {
			if (current) {
				return formatNumber(current / divider, 'zeroZero')
			}
			return '-'
		}

		case 'percentage': {
			return (current * 100).toFixed(decimals) + '%'
		}

		case 'growth': {
			if (current > 0) {
				return `<span class="text-green-700">${(current * 100).toFixed(decimals) + '%'}</span>`
			}
			if (current < 0) {
				return `<span class="text-red-600">${(current * 100).toFixed(decimals) + '%'}</span>`
			}
			return '-'
		}

		// Colors are inverted (when lower is better, for example shares out change)
		case 'inverted-growth': {
			if (current > 0) {
				return `<span class="text-red-600">${(current * 100).toFixed(decimals) + '%'}</span>`
			}
			if (current < 0) {
				return `<span class="text-green-700">${(current * 100).toFixed(decimals) + '%'}</span>`
			}
			return '-'
		}

		case 'pershare': {
			if (current) {
				return current.toFixed(decimals)
			}
			return '-'
		}

		case 'ratio': {
			if (current === 0) return '0'
			if (current) {
				return divider === 1 || isHover
					? (Math.round(current * 1000) / 1000).toFixed(3)
					: (Math.round(current * 100) / 100).toFixed(2)
			}
			return '-'
		}

		default:
			return ''
	}
}

/**
 * Rewrite the financial data to be in a format that can be exported
 */
export function extractFinancials(data: any, statement: string, range: string) {
	const KEYS: any = {
		datekey: 'Date',
		revenue: 'Revenue',
		revenueGrowth: 'Revenue Growth',
		cor: 'Cost of Revenue',
		gp: 'Gross Profit',
		sgna: 'Selling, General & Admin',
		rnd: 'Research & Development',
		otheropex: 'Other Operating Expenses',
		opex: 'Operating Expenses',
		opinc: 'Operating Income',
		intexp: 'Interest Expense / Income',
		otherincome: 'Other Expense / Income',
		taxexp: 'Income Tax',
		pretax: 'Pretax Income',
		netinc: 'Net Income',
		prefdivis: 'Preferred Dividends',
		netinccmn: 'Net Income Common',
		netIncomeGrowth: 'Net Income Growth',
		shareswa: 'Shares Outstanding (Basic)',
		shareswadil: 'Shares Outstanding Diluted (Diluted)',
		sharesYoY: 'Shares Change',
		eps: 'EPS (Basic)',
		epsdil: 'EPS (Diluted)',
		epsGrowth: 'EPS Growth',
		fcfps: 'Free Cash Flow Per Share',
		dps: 'Dividend Per Share',
		dividendGrowth: 'Dividend Growth',
		fcf: 'Free Cash Flow',
		grossMargin: 'Gross Margin',
		operatingMargin: 'Operating Margin',
		profitMargin: 'Profit Margin',
		fcfMargin: 'Free Cash Flow Margin',
		taxrate: 'Effective Tax Rate',
		ebitda: 'EBITDA',
		ebitdaMargin: 'EBITDA Margin',
		ebit: 'EBIT',
		ebitMargin: 'EBIT Margin',
		cashneq: 'Cash & Equivalents',
		investmentsc: 'Short-TermInvestments',
		totalcash: 'Cash & Cash Equivalents',
		cashGrowth: 'Cash Growth',
		receivables: 'Receivables',
		inventory: 'Inventory',
		othercurrent: 'Other Current Assets',
		assetsc: 'Total Current Assets',
		ppnenet: 'Property, Plant & Equipment',
		investmentsnc: 'Long-Term Investments',
		intangibles: 'Goodwill and Intangibles',
		othernoncurrent: 'Other Long-Term Assets',
		assetsnc: 'Total Long-Term Assets',
		assets: 'Total Assets',
		payables: 'Accounts Payable',
		deferredrev: 'Deferred Revenue',
		debtc: 'Current Debt',
		otherliabilitiescurrent: 'Other Current Liabilities',
		liabilitiesc: 'Total Current Liabilities',
		debtnc: 'Long-Term Debt',
		otherliabilitiesnoncurrent: 'Other Long-Term Liabilities',
		liabilitiesnc: 'Total Long-Term Liabilities',
		liabilities: 'Total Liabilities',
		debt: 'Total Debt',
		debtGrowth: 'Debt Growth',
		commonstocknet: 'Common Stock',
		retearn: 'Retained Earnings',
		accoci: 'Comprehensive Income',
		equity: 'Shareholders Equity',
		liabilitiesequity: 'Total Liabilities and Equity',
		netcash: 'Net Cash / Debt',
		netCashGrowth: 'Net Cash / Debt Growth',
		netcashpershare: 'Net Cash Per Share',
		workingcapital: 'Working Capital',
		bvps: 'Book Value Per Share',
		depamor: 'Depreciation & Amortization',
		sbcomp: 'Share-Based Compensation',
		otheroperating: 'Other Operating Activities',
		ncfo: 'Operating Cash Flow',
		ocfGrowth: 'Operating Cash Flow Growth',
		capex: 'Capital Expenditures',
		ncfbus: 'Acquisitions',
		ncfinv: 'Change in Investments',
		otherinvesting: 'Other Investing Activities',
		ncfi: 'Investing Cash Flow',
		ncfdiv: 'Dividends Paid',
		ncfcommon: 'Share Issuance / Repurchase',
		ncfdebt: 'Debt Issued / Paid',
		otherfinancing: 'Other Financing Activities',
		ncff: 'Financing Cash Flow',
		ncf: 'Net Cash Flow',
		fcfGrowth: 'Free Cash Flow Growth',
		marketcap: 'Market Capitalization',
		marketCapGrowth: 'Market Cap Growth',
		ev: 'Enterprise Value',
		pe: 'PE Ratio',
		ps: 'PS Ratio',
		pb: 'PB Ratio',
		pfcf: 'P/FCF Ratio',
		pocf: 'P/OCF Ratio',
		evrevenue: 'EV/Revenue',
		evebitda: 'EV/EBITDA',
		evebit: 'EV/EBIT',
		evfcf: 'EV/FCF',
		debtequity: 'Debt/Equity',
		debtebitda: 'Debt/EBITDA',
		debtfcf: 'Debt/FCF',
		currentratio: 'Current Ratio',
		assetturnover: 'Asset Turnover',
		roe: 'Return on Equity (ROE)',
		roa: 'Return on Assets (ROA)',
		roic: 'Return on Invested Capital (ROIC)',
		earningsyield: 'Earnings Yield',
		fcfyield: 'Free Cash Flow Yield',
		dividendyield: 'Dividend Yield',
		payoutratio: 'Payout Ratio',
		buybackyield: 'Buyback Yield',
		totalreturn: 'Total Return'
	}

	let financials: any = []
	const keys = Object.keys(data)
	keys.forEach((key) => {
		if (statement === 'cash-flow-statement' && key === 'revenue') {
			// Do nothing
		} else {
			let arr = data[key]
			let parsedKey = KEYS[key] || key
			arr.unshift(parsedKey)
			financials.push(arr)
		}
	})

	return financials
}

/**
 * This function builds an array that tells the excellentexport plugin how to export the data
 */
export function buildReturnArray(data: any) {
	const CONVERT: any = {
		annual: 'Annual',
		quarterly: 'Quarterly',
		trailing: 'TTM',
		'income-statement': 'Income',
		'balance-sheet': 'Balance-Sheet',
		'cash-flow-statement': 'Cash-Flow',
		ratios: 'Ratios'
	}

	let ranges = ['annual', 'quarterly', 'trailing']

	let extracted: any = []

	ranges.forEach((key) => {
		let range = data[key]
		if (range) {
			Object.keys(range).forEach((statement) => {
				let statementObj = range[statement]
				if (statementObj.count > 0) {
					let d = statementObj.data
					let arr = extractFinancials(d, statement, key)
					let name = `${CONVERT[statement]}-${CONVERT[key]}`
					extracted.push({ name, from: { array: arr } })
				}
			})
		}
	})

	return extracted
}
