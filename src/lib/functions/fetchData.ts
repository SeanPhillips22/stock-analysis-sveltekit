/**
 * This function calls the back-end to fetch data to use on the front-end
 * @param {string} params The parameters to use in the API request, ex: "q?id=123"
 */

export async function fetchData(params: string, controller?: AbortSignal) {
	const url = import.meta.env.VITE_PUBLIC_API_URL || 'https://api.stockanalysis.com/wp-json/sa'

	const response =
		typeof controller === 'undefined'
			? await fetch(`${url}/${encodeURI(params)}`)
			: await fetch(`${url}/${encodeURI(params)}`, {
					signal: controller
			  })

	if (response.ok) {
		if (controller) controller = undefined
		return await response.json()
	}

	throw new Error(`API/fetchData not ok: ${response.status} ${response.statusText}`)
}
