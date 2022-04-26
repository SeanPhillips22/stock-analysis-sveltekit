// Copy-pasted from supabase code
export type UserObject = {
	id: string
	app_metadata: {
		provider?: string
		[key: string]: any
	}
	user_metadata: {
		[key: string]: any
	}
	aud: string
	confirmation_sent_at?: string
	recovery_sent_at?: string
	invited_at?: string
	action_link?: string
	email?: string
	phone?: string
	created_at: string
	confirmed_at?: string
	email_confirmed_at?: string
	phone_confirmed_at?: string
	last_sign_in_at?: string
	role?: string
	updated_at?: string
}

export type User = UserObject | null | undefined

export type UserData = {
	email: string
	registered_date?: string
	status?: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted' | 'cancelled'
	next_bill_date?: string
	next_payment_amount?: string
	currency?: string
	payment_method?: string
	update_url?: string
	cancel_url?: string
}
