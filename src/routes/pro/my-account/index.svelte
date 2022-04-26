<script lang="ts">
	import { user } from '$lib/auth/userStore'
	import { getUserData } from '$lib/auth/getUserData'
	import type { UserData } from '$lib/auth/types'
	import { formatDateClean } from '$lib/functions/datetime/formatDates'

	import Spinner from '$lib/components/Loading/LargeSpinner.svelte'
	import Reactivate from '$lib/components/Uncategorized/Reactivate.svelte'

	let loading = true
	let data: UserData | undefined

	async function loadData() {
		data = await getUserData(
			'email, registered_date, status, next_bill_date, next_payment_amount, currency, payment_method, update_url, cancel_url'
		)
		loading = false
	}

	// Load the data for the user
	if ($user) {
		loadData()
	}

	// Check if the user has an active Pro subscription
	$: isSubscribed = data?.status === 'active' || data?.status === 'trialing'

	// Create a prettier format of the status
	let showStatus = ''
	$: {
		if (data?.status === 'active') showStatus = 'Subscription Active'
		if (data?.status === 'past_due') showStatus = 'Subscription Is Past Due'
		if (data?.status === 'trialing') showStatus = 'Free Trial Active'
		if (data?.status === 'paused') showStatus = 'Subscription Paused'
		if (data?.status === 'deleted') showStatus = 'Subscription Cancelled'
		if (data?.status === 'cancelled') showStatus = 'Subscription Cancelled'
	}
</script>

<div class="wrap">
	{#if loading}
		<div>
			<Spinner />
		</div>
	{:else if $user}
		<h1>My Account</h1>

		<div class="area">
			<h2>User Information</h2>

			{#if data?.email}
				<div><strong>Email:</strong> {data?.email}</div>
			{/if}

			{#if data?.registered_date}
				<div><strong>Registered Date:</strong> {formatDateClean(data.registered_date)}</div>
			{/if}
		</div>

		<div class="area">
			<h2>Manage Subscription</h2>

			{#if showStatus}
				<div class="mb-2"><strong>Status:</strong> {showStatus}</div>
			{/if}

			{#if !isSubscribed}
				{#if data?.next_bill_date}
					<div>Next Payment Date: {data?.next_bill_date}</div>
				{/if}

				{#if data?.next_payment_amount && data?.next_payment_amount !== '0'}
					<div>Next Payment Amount: {data?.next_payment_amount} {data?.currency}</div>
				{/if}

				{#if data?.payment_method}
					<div>Payment Method: {data?.payment_method}</div>
				{/if}

				{#if data?.update_url}
					<a href={data?.update_url} target="_blank" rel="nofollow noopener noreferrer">Update Payment Details</a>
				{/if}

				{#if data?.cancel_url}
					<div class="mt-3">
						<a href="/pro/cancel/" sveltekit:prefetch>Cancel Subscription</a>
					</div>
				{/if}
			{:else}
				<Reactivate email={data?.email} status={data?.status} />
			{/if}
		</div>

		<div class="area">
			<h2>Get Support</h2>

			<div class="mb-4 font-bold">Here's how to get support:</div>

			<ol class="ml-8 list-decimal">
				<li class="mb-2">Click the blue chat widget in the bottom right corner.</li>
				<li class="mb-2">Send an email to support@stockanalysis.com.</li>
				<li>Send a message via the <a href="/contact/" sveltekit:prefetch>contact form</a>.</li>
			</ol>
		</div>
	{:else}
		<div>
			<div class="loginprompt">Whoops! This page is only available for logged in users.</div>
			<p class="mb-4 text-lg">
				If you already have an account, <a href="/login/" sveltekit:prefetch>login here</a>.
			</p>
			<p class="text-lg">
				If not, you can sign up for a free 30-day trial to <a href="/pro/" sveltekit:prefetch>Stock Analysis Pro</a>.
			</p>
		</div>
	{/if}
</div>

<style>
	.wrap {
		@apply mx-auto max-w-3xl space-y-6 px-4 py-8 xs:space-y-8 xs:px-6 xs:py-12;
	}

	h1 {
		@apply mb-5 border-b-2 border-gray-800 pb-4 text-3xl font-bold text-gray-800 xs:text-4xl;
	}

	.area {
		@apply rounded-md border border-gray-200 p-3 text-base xs:p-4 xs:text-lg;
	}

	.loginprompt {
		@apply mb-5 border-b-2 border-gray-900 pb-4 text-2xl font-bold;
	}
</style>
