<script lang="ts">
	import { supabase } from '$lib/auth/supabase'
	import { user } from '$lib/auth/userStore'
</script>

{#if !$user}
	<div class="ml-auto hidden xxl:flex gap-x-2">
		<button class="button-white">
			<a href="/login/">Log In</a>
		</button>
		<button class="button-blue">
			<a href="/pro/">Free Trial</a>
		</button>
	</div>
{:else}
	<div class="ml-auto hidden xxl:flex gap-x-1">
		<button class="button-white logged-out">
			<div on:click={() => supabase.auth.signOut()}>Log Out</div>
		</button>
		<button class="button-white logged-out border border-gray-300">
			<a href="/pro/my-account/">My Account</a>
		</button>
	</div>
{/if}

<style type="text/postcss">
	.button-white {
		@apply inline-flex items-center justify-center w-full px-4 py-1.5 text-lg font-semibold rounded-sm text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap;
	}

	.button-white a {
		@apply text-gray-900;
		color: #111827;
	}

	.button-white.logged-out {
		@apply text-base;
	}

	.button-white.logged-out a {
		@apply text-gray-800;
	}

	.button-blue {
		@apply inline-flex items-center justify-center px-4 py-1.5 border border-transparent text-lg font-semibold rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-brand_light text-white hover:bg-blue-brand_sharp whitespace-nowrap;
		background-color: #3c74d4;
	}

	.button-blue a {
		@apply text-white;
		color: #ffffff;
	}
</style>
