<script lang="ts">
	import { supabase } from '$lib/auth/supabase'
	import Logo from '$lib/components/Logos/Logo.svelte'
	import Spinner from '$lib/icons/Spinner.svelte'

	let loading = false
	let email: string
	let error: string

	async function handleLogin() {
		try {
			loading = true
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
		} catch (e: any) {
			console.error(e)
			error = e.message
		} finally {
			loading = false
		}
	}

	$: console.log(supabase)
</script>

<div class="wrap">
	<a href="/" sveltekit:prefetch><Logo classes="mx-auto mb-6 h-24 w-24 sm:h-28 sm:w-28" /></a>
	<h1>Log in to your account</h1>
	<p>Or <a href="/pro/" sveltekit:prefetch>start your free 30-day trial</a></p>

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
</div>

<style>
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
</style>
