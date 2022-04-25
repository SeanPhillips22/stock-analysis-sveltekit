export type NavigationNames =
	| 'Home'
	| 'Stocks'
	| 'IPOs'
	| 'ETFs'
	| 'News'
	| 'Trending'
	| 'Market Movers'
	| 'Screener'
	| 'Corporate Actions'

export type Navigation = {
	name: NavigationNames
	href: string
	icon?: any
	children?: {
		name: string
		href: string
	}[]
}[]
