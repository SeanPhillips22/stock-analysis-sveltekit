export async function get() {
	const req = await fetch('https://api.stockanalysis.com/wp-json/sa/ipos?q=statistics')
	const json = await req.json()
	const { data, news, recent } = json

	if (data) {
		return {
			body: {
				data,
				news,
				recent
			}
		}
	}

	return {
		status: 404
	}
}
