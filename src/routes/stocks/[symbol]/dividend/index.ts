export async function get({ params }: any) {
	let symbol = params.symbol

	let host = import.meta.env.VITE_PUBLIC_API_URL
	let url = `${host}/dividend?symbol=${symbol}&t=stocks`

	const req = await fetch(url)
	const data = await req.json()

	if (data) {
		return {
			body: { data: data.data.data, info: data.data.info }
		}
	}

	return {
		status: 404
	}
}
