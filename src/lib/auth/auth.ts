import { supabase } from '$lib/auth/supabase'
import { user } from '$lib/auth/userStore'
import type { User } from './types'

// Set the user on initial load
user.set(supabase.auth.user())

// Subscribe to changes in authentication state
supabase.auth.onAuthStateChange((event, session) => {
	user.set(session?.user)
})
