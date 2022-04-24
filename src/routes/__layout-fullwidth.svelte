<script>
	import '../app.css'
	import NProgress from 'nprogress'
	import { navigating } from '$app/stores'
	import 'nprogress/nprogress.css'
	import Header from '$lib/components/Header/_Header.svelte'
	import Navigation from '$lib/components/Navigation/_Navigation.svelte'
	import Footer from '$lib/components/Footer/_Footer.svelte'

	// Progress bar config
	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	})

	// Stop and end progress bar
	$: {
		if ($navigating) {
			NProgress.start()
		}
		if (!$navigating) {
			NProgress.done()
		}
	}

	// Get the global state for showing and hiding the navigation
	import { navigationOpen } from '$lib/stores/navigation'
	let showNavigation
	navigationOpen.subscribe((value) => {
		showNavigation = value
	})
</script>

<Header />

<div class:mainbody={showNavigation}>
	<Navigation />
	<main>
		<slot />
	</main>
</div>

<Footer />

<style>
	.mainbody {
		@apply grow xxl:grid xxl:grid-cols-leftnav gap-x-0;
	}

	main {
		@apply mx-auto mb-10 w-full;
	}
</style>
