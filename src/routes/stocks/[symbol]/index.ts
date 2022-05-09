export async function get({ params }: any) {
	let symbol = params.symbol

	let host = import.meta.env.VITE_PUBLIC_API_URL
	let url = `${host}/overview?symbol=${symbol}&t=stocks`

	const req = await fetch(url)
	const data = await req.json()

	if (data) {
		return {
			body: { info: data.data.info, data: data.data.data, news: data.data.news }
		}
	}

	return {
		status: 404
	}
}
