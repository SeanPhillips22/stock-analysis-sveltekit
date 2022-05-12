export async function get() {
	const req = await fetch('https://api.stockanalysis.com/wp-json/sa/ipos?q=news')
	const json = await req.json()
	const { data, upcoming, recent } = json

	if (data) {
		return {
			body: {
				data,
				upcoming,
				recent
			}
		}
	}

	return {
		status: 404
	}
}
