<script lang="ts">
	import { supabase } from '$lib/auth/supabase'
	import { user } from '$lib/auth/userStore'

	import Logo from '$lib/components/Logos/Logo.svelte'
	import Spinner from '$lib/components/Loading/SmallSpinner.svelte'

	let loading = false
	let submitted = false
	let email: string
	let error: string

	async function handleLogin() {
		try {
			loading = true
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
			submitted = true
		} catch (e: any) {
			console.error(e)
			if (e.message === 'You must provide either an email, phone number, a third-party provider or OpenID Connect.') {
				error = 'You must provide a valid email address.'
			} else {
				error = e.message
			}
		} finally {
			loading = false
		}
	}
</script>

<main>
	<div class="wrap">
		<a href="/" sveltekit:prefetch><Logo classes="mx-auto mb-6 h-24 w-24 sm:h-28 sm:w-28" /></a>
		{#if $user}
			<h1>You are logged in</h1>
			{#if $user.email}
				<p>Logged in as {$user.email}</p>
			{/if}
			<div class="form-wrap">
				<button on:click={() => supabase.auth.signOut()}>Log Out</button>
			</div>
		{:else if submitted}
			<div class="submitted">
				<h1>Click the login link in your email</h1>
				<p>
					Open your email and click the login link, no password required. Your browser will remember so you do not have
					to repeat this all the time.
				</p>
			</div>
		{:else}
			<h1>Log in to your account</h1>
			<p>Or <a href="/pro/" sveltekit:prefetch>start your free 30-day trial</a></p>

			{#if error}
				<div class="error">{error}</div>
			{/if}

			<div class="form-wrap">
				<form on:submit|preventDefault={handleLogin}>
					<label for="email">Email address</label>
					<input name="email" type="email" autocomplete="email" required bind:value={email} />
					{#if loading}
						<button type="submit" disabled>
							<Spinner /> Logging in...
						</button>
					{:else}
						<button type="submit"> Log In </button>
					{/if}
				</form>
			</div>
		{/if}
	</div>
</main>

<style type="text/postcss">
	.wrap {
		@apply sm:mx-auto sm:w-full sm:max-w-md py-8 sm:py-20;
	}

	h1 {
		@apply text-center text-2xl font-bold text-gray-900 xs:text-3xl;
	}

	p {
		@apply mt-2 text-center text-smaller font-medium text-gray-600;
	}

	.form-wrap {
		@apply border border-gray-300 bg-white py-6 px-4 xs:py-8 sm:rounded-lg sm:px-10 mt-6 xs:mt-8;
	}

	label {
		@apply block text-sm font-medium text-gray-700;
	}

	input {
		@apply block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm mt-1;
	}

	button {
		@apply flex w-full justify-center rounded-md border border-transparent bg-blue-brand_light py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2;
	}

	.submitted h1 {
		@apply mt-2 text-center text-2xl font-bold text-gray-900 xs:mt-4 xs:text-3xl sm:mt-6;
	}

	.submitted p {
		@apply mt-4 text-center text-smaller font-medium text-gray-600;
	}

	.error {
		@apply border-l-4 border-red-400 bg-red-50 p-4 text-red-700 mt-5 -mb-3;
	}
</style>
