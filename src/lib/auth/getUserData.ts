import { supabase } from '$lib/auth/supabase'

export async function getUserData(fields: string) {
	try {
		const user = supabase.auth.user()

		let { data, error, status } = await supabase.from('userdata').select(fields).eq('id', user?.id).single()

		if (error && status !== 406) throw error

		if (data) return data
	} catch (error: any) {
		console.error(error.message)
		return error
	}
}
