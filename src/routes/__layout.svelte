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
</script>

<Header />

<div class="mainbody">
	<Navigation />
	<main>
		<slot />
	</main>
</div>

<Footer />

<style>
	.mainbody {
		@apply grow xxl:grid xxl:max-w-[1420px] xxl:grid-cols-leftnav xxl:gap-x-1 xxxl:gap-x-2;
	}

	main {
		@apply mx-auto mb-10 w-full xl:max-w-screen-xl xxl:mx-0 px-3 py-5 xs:px-4 xs:py-6 lg:px-6;
	}
</style>
