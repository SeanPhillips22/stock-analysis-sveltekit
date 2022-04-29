<script lang="ts">
	import '../app.css'
	import { navigating } from '$app/stores'

	import NProgress from 'nprogress'

	import Header from '$lib/components/Header/_Header.svelte'
	import Navigation from '$lib/components/Navigation/_Navigation.svelte'
	import Footer from '$lib/components/Footer/_Footer.svelte'
	import HeaderAd from '$lib/components/Ads/AdSense/HeaderAd.svelte'

	/**
	 * Authentication
	 */
	import '$lib/auth/auth'

	/**
	 * Progress bar
	 */
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
	<div>
		<HeaderAd />
		<slot />
	</div>
</div>

<Footer />

<style type="text/postcss">
	.mainbody {
		@apply grow xxl:grid xxl:grid-cols-leftnav;
	}
</style>
