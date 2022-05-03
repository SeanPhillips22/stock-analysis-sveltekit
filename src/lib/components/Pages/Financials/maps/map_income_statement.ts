import type { FinancialsMap } from '../types'

export const MAP_INCOME_STATEMENT: FinancialsMap[] = [
	{
		id: 'revenue',
		title: 'Revenue',
		tooltip:
			'Revenue is the amount of money a company receives from its main business activities, such as sales of products or services. Revenue is also called sales.',
		class: 'bolded'
	},
	{
		id: 'revenueGrowth',
		title: 'Revenue Growth (YoY)',
		tooltipTitle: 'Revenue Growth (YoY)',
		format: 'growth',
		tooltip:
			"Year-over-year (YoY) revenue growth is how much a company's revenue has increased compared to the same time period one year ago.",
		formula: 'Revenue Growth = ((Current Revenue / Previous Revenue) - 1) * 100%',
		class: 'bordered indented'
	},
	{
		id: 'cor',
		title: 'Cost of Revenue',
		tooltip:
			"Cost of revenue is also called cost of goods sold (COGS). It is the variable cost related to the company's production of products and services.",
		class: 'indented'
	},
	{
		id: 'gp',
		title: 'Gross Profit',
		tooltip:
			'Gross profit is a company’s profit after subtracting the costs directly linked to making and delivering its products and services.',
		formula: 'Gross Profit = Revenue - Cost of Revenue',
		class: 'bolded bordered'
	},
	{
		id: 'sgna',
		title: 'Selling, General & Admin',
		tooltip:
			'Selling, general and administrative (SG&A) is an operating expense. It involves various company expenses that are not related to production.',
		class: 'indented'
	},
	{
		id: 'rnd',
		title: 'Research & Development',
		tooltip:
			'Research and development (R&D) is an operating expense. It is the amount of money a company spends on researching and developing new products and services, or improving existing ones.',
		class: 'indented'
	},
	{
		id: 'otheropex',
		title: 'Other Operating Expenses',
		tooltip: 'Other operating expenses are operating expenses that do not fit into the SG&A and R&D categories.',
		class: 'indented'
	},
	{
		id: 'opex',
		title: 'Operating Expenses',
		tooltip:
			"Operating expenses (OPEX) are a company's fixed costs that a company incurs during its ongoing business operations. It can include SG&A, R&D and other expenses."
	},
	{
		id: 'opinc',
		title: 'Operating Income',
		tooltip:
			'Operating income is the amount of profit in a company after paying for all the expenses related to its core operations.',
		formula: 'Operating Income = Revenue - Cost of Revenue - Operating Expenses',
		class: 'bolded bordered'
	},
	{
		id: 'intexp',
		title: 'Interest Expense / Income',
		tooltip:
			'Interest expense or income is the amount that the company paid or received in interest. A positive number indicates a net expense, while a negative number implies that the company had more interest income from its cash reserves than it paid for interest on debt.'
	},
	{
		id: 'interestIncome',
		title: 'Interest Income',
		tooltip: 'Interest income is the amount that the company received in interest.'
	},
	{
		id: 'interestExpense',
		title: 'Interest Expense',
		tooltip: 'Interest expense is the amount that the company paid in interest.'
	},
	{
		id: 'otherincome',
		title: 'Other Expense / Income',
		tooltip:
			'Other expense or income is any non-operating item that does not fall under another non-operating category. It often includes non-recurring items that are not a part of normal operations. A negative number implies that the company received more than it spent.',
		class: 'indented'
	},
	{
		id: 'pretax',
		title: 'Pretax Income',
		tooltip: "Pretax income is a company's profits before accounting for income taxes.",
		formula: 'Pretax Income = Net Income + Income Taxes',
		class: 'bolded'
	},
	{
		id: 'taxexp',
		title: 'Income Tax',
		tooltip: 'Income tax is the amount of corporate income tax that the company has incurred during the fiscal period.',
		class: 'indented'
	},
	{
		id: 'netinc',
		title: 'Net Income',
		tooltip:
			'Net income is a company\'s accounting profits after subtracting all costs and expenses from the revenue. It is also called earnings, profits or "the bottom line"',
		formula: 'Net Income = Revenue - All Expenses'
	},
	{
		id: 'prefdivis',
		title: 'Preferred Dividends',
		tooltip:
			'Preferred dividends are dividend payments to owners of preferred stock. These payments have priority over dividend payments for common stock owners.',
		class: 'indented'
	},
	{
		id: 'netinccmn',
		title: 'Net Income Common',
		tooltip:
			'Net income available to common shareholders is shown when a stock pays preferred dividends. It subtracts the preferred dividends from the total net income.',
		formula: 'Net Income Common = Net Income - Preferred Dividends',
		class: 'bolded'
	},

	{
		id: 'netIncomeGrowth',
		title: 'Net Income Growth',
		tooltipTitle: 'Net Income Growth (YoY)',
		format: 'growth',
		tooltip:
			'Net income growth is the change in the net income available to common shareholders, compared to a previous period.',
		class: 'bordered indented'
	},
	{
		id: 'shareswa',
		title: 'Shares Outstanding (Basic)',
		format: 'reduce_precision',
		tooltip: "Basic shares outstanding is the total amount of common stock held by all of a company's shareholders."
	},
	{
		id: 'shareswadil',
		title: 'Shares Outstanding (Diluted)',
		format: 'reduce_precision',
		tooltip:
			'Diluted shares outstanding is the total amount of common stock that will be outstanding if all stock options, warrants and convertible securities are exercised.',
		class: 'bolded'
	},
	{
		id: 'sharesYoY',
		title: 'Shares Change',
		tooltipTitle: 'Shares Change (YoY)',
		format: 'inverted-growth',
		tooltip:
			'The shares change calculates whether the amount of diluted outstanding shares is increasing or decreasing. It can increase due to new shares being issued, such as for stock-based compensation. A decrease implies stock buybacks and that the company is buying back more shares than it issues.',
		class: 'bordered indented'
	},
	{
		id: 'eps',
		title: 'EPS (Basic)',
		format: 'pershare',
		tooltip:
			'Earnings per share is the portion of a company\'s profit that is allocated to each individual stock. Basic EPS is calculated by dividing net income by "basic" shares outstanding.',
		formula: 'Basic EPS = Net Income / Shares Outstanding (Basic)'
	},
	{
		id: 'epsdil',
		title: 'EPS (Diluted)',
		format: 'pershare',
		tooltip:
			'Earnings per share is the portion of a company\'s profit that is allocated to each individual stock. Diluted EPS is calculated by dividing net income by "diluted" shares outstanding.',
		formula: 'Diluted EPS = Net Income / Shares Outstanding (Diluted)',
		class: 'bolded'
	},
	{
		id: 'epsGrowth',
		title: 'EPS Growth',
		tooltipTitle: 'EPS Growth (YoY)',
		format: 'growth',
		tooltip:
			'Earnings per share growth is the change in the earnings per share compared to a previous period. It is not possible to calculate it for negative numbers, in that case it will show as "n/a"',
		formula: 'EPS Growth = ((Current EPS / Previous EPS) - 1) * 100%',
		class: 'bordered indented'
	},
	{
		id: 'fcfps',
		title: 'Free Cash Flow Per Share',
		format: 'pershare',
		tooltip: 'Free cash flow per share is the amount of free cash flow attributed to each outstanding stock.'
	},
	{
		id: 'dps',
		title: 'Dividend Per Share',
		format: 'pershare',
		tooltip: 'Total amount paid to each outstanding share in dividends during the period.',
		class: 'bolded'
	},
	{
		id: 'dividendGrowth',
		title: 'Dividend Growth',
		tooltipTitle: 'Dividend Growth (YoY)',
		format: 'growth',
		tooltip: 'The change in dividend payments per share, compared to the previous period.',
		formula: 'Dividend Growth = ((Current Dividend / Previous Dividend) - 1) * 100%',
		class: 'bordered indented'
	},
	{
		id: 'grossMargin',
		title: 'Gross Margin',
		format: 'percentage',
		tooltip:
			'Gross margin is the percentage of revenue left as gross profits, after subtracting cost of goods sold from the revenue.',
		formula: 'Gross Margin = (Gross Profit / Revenue) * 100%'
	},
	{
		id: 'operatingMargin',
		title: 'Operating Margin',
		format: 'percentage',
		tooltip:
			'Operating margin is the percentage of revenue left as operating income, after subtracting cost of revenue and all operating expenses from the revenue.',
		formula: 'Operating Margin = (Operating Income / Revenue) * 100%'
	},
	{
		id: 'profitMargin',
		title: 'Profit Margin',
		format: 'percentage',
		tooltip:
			'Profit margin is the percentage of revenue left as net income, or profits, after subtracting all costs and expenses from the revenue.',
		formula: 'Profit Margin = (Net Income / Revenue) * 100%'
	},
	{
		id: 'fcfMargin',
		title: 'Free Cash Flow Margin',
		format: 'percentage',
		tooltip:
			'FCF margin is the percentage of revenue left as free cash flow. FCF is calculated by subtracting capital expenditures (CapEx) from the operating cash flow (OCF). Both CapEx and OCF are shown on the cash flow statement.',
		formula: 'FCF Margin = (Free Cash Flow / Revenue) * 100%'
	},
	{
		id: 'taxrate',
		title: 'Effective Tax Rate',
		format: 'percentage',
		tooltip: 'The effective tax rate is the percentage of taxable income paid in corporate income tax.',
		formula: 'Effective Tax Rate = (Income Tax / Pretax Income) * 100%',
		class: 'bordered'
	},
	{
		id: 'ebitda',
		title: 'EBITDA',
		tooltip:
			'EBITDA stands for "Earnings Before Interest, Taxes, Depreciation and Amortization." It is a commonly used measure of profitability.',
		formula: 'EBITDA = Net Income + Interest + Taxes + Depreciation and Amortization',
		class: 'bolded'
	},
	{
		id: 'ebitdaMargin',
		title: 'EBITDA Margin',
		format: 'percentage',
		tooltip:
			'EBITDA margin is the percentage of revenue left as EBITDA, after subtracting all expenses except interest, taxes, depreciation and amortization from revenue.',
		formula: 'EBITDA Margin = (EBITDA / Revenue) * 100%',
		class: 'bordered indented'
	},
	{
		id: 'depamor',
		title: 'Depreciation & Amortization',
		tooltip:
			"Depreciation and amortization are accounting methods for calculating how the value of a business's assets change over time. Depreciation refers to physical assets, while amortization refers to intangible assets.",
		class: 'indented'
	},
	{
		id: 'ebit',
		title: 'EBIT',
		tooltip:
			'EBIT stands for "Earnings Before Interest and Taxes" and is a commonly used measure of earnings or profits. It is similar to operating income.',
		formula: 'EBIT = Net Income + Interest + Taxes',
		class: 'bolded'
	},
	{
		id: 'ebitMargin',
		title: 'EBIT Margin',
		format: 'percentage',
		tooltip:
			'EBIT Margin is a profitability ratio that measures the percentage of revenue left as EBIT (Earnings Before Interest and Taxes).',
		formula: 'EBIT Margin = (EBIT / Revenue) * 100%',
		class: 'indented'
	}
]
