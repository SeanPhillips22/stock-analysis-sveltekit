export async function doSearch(query: string) {
	try {
		let res = await fetch('https://api.stockanalysis.com/search?q=' + query)
		let data = await res.json()
		return data
	} catch (e) {
		console.error(e)
		return []
	}
}
