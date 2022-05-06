import { supabase } from '$lib/auth/supabase'
import { user, setIsPro } from '$lib/auth/userStore'

// Subscribe to changes in authentication state
// Also sets the user on initial load and checks for Pro status
supabase.auth.onAuthStateChange((event, session) => {
	user.set(session?.user)
	if (event === 'SIGNED_IN') {
		checkPro()
	}
})

// Check the users's subscription status (slow)
// The user's database row is queried to get the subscription status and
// other info, then added to the "user" object
// - enable access to Pro features
// - hide ads
async function checkPro() {
	const { data } = await supabase.from('userdata').select()

	if (data && data[0]) {
		let userdata = data[0] // userdata for the public.userdata table

		if (['trialing', 'active', 'past_due'].includes(userdata.status)) {
			setIsPro(true)
		} else if (userdata.status === 'deleted' || userdata.status === 'paused') {
			let stopDate = userdata.cancelled_date ?? userdata.paused_date ?? null

			if (stopDate) {
				if (stopDate && new Date() < new Date(stopDate)) {
					setIsPro(true)
					console.log('user is pro')
				}
			}
		}
	}
}
