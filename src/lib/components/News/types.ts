export type NewsItem = {
	title: string
	url: string
	source: string
	type: 'Article' | 'Video'
	text: string
	timeAgo: string
	timeFull: string
	time?: string
	tickers?: string[]
	image?: string
}

export type NewsArray = NewsItem[]

export type NewsObject = {
	updated: number
	data: NewsArray
}
