export async function get() {
	const req = await fetch('https://api.stockanalysis.com/wp-json/sa/homepage')
	const data = await req.json()

	if (data) {
		return {
			body: { data }
		}
	}

	return {
		status: 404
	}
}
