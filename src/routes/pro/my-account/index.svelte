<script lang="ts">
	import { supabase } from '$lib/auth/supabase'
	import { user } from '$lib/auth/userStore'

	let loading = true
	let email = ''

	async function getUserData() {
		try {
			loading = true
			const user = supabase.auth.user()

			let { data, error, status } = await supabase.from('userdata').select('email').eq('id', user?.id).single()

			if (error && status !== 406) throw error

			if (data) {
				email = data.email
			}
		} catch (error: any) {
			console.error(error.message)
		} finally {
			loading = false
		}
	}

	getUserData()
</script>

<div class="wrap">
	<h1>My Account</h1>
	<div>Email: {email}</div>
</div>
