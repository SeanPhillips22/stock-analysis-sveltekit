<script>
	import { goto } from '$app/navigation'

	async function handleSubmit() {
		let response = await fetch('https://stockanalysis.com/api/nwsl/post', {
			body: JSON.stringify({ email }),
			method: 'POST'
		})

		if (response.ok) {
			goto('/subscribe/thank-you/')
		} else {
			console.log('there was an error')
		}
	}

	let email = ''
</script>

<div class="mt-8 xl:mt-0">
	<h4 class="text-sm font-semibold uppercase tracking-wider text-gray-400">Subscribe to the newsletter</h4>
	<p class="mt-4 text-base text-gray-300">The latest updates, straight to your inbox.</p>
	<form class="mt-4 sm:flex sm:max-w-md" method="post" on:submit|preventDefault={handleSubmit}>
		<label for="email-footer" class="sr-only">Email address</label>
		<input
			bind:value={email}
			class="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
			type="email"
			id="email-footer"
			name="fields[email]"
			placeholder="Enter your email"
			autoComplete="email"
		/>
		<div class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:shrink-0">
			<input
				name="submit"
				type="submit"
				class="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-brand_light py-2 px-4 text-base font-medium text-white transition duration-200 hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-brand_sharp focus:ring-offset-2 focus:ring-offset-gray-800"
				value="Subscribe"
			/>
		</div>
	</form>
</div>
