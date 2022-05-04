export async function get({ params }: any) {
	let symbol = params.symbol

	let host = import.meta.env.VITE_PUBLIC_API_URL
	let url = `${host}/financials?type=cash-flow-statement&symbol=${symbol}&range=quarterly`

	const req = await fetch(url)
	const data = await req.json()

	if (data) {
		return {
			body: { data: data.data }
		}
	}

	return {
		status: 404
	}
}
