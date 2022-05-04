export async function get({ params }: any) {
	let symbol = params.symbol

	let host = import.meta.env.VITE_PUBLIC_API_URL
	let url = `${host}/financials?type=balance-sheet&symbol=${symbol}&range=annual`

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
