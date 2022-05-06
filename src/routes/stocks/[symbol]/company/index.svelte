<script lang="ts">
	import Sidebar1All from '$lib/components/Ads/AdSense/Sidebar1All.svelte'
	import ProfileContact from '$lib/components/Pages/Company/ProfileContact.svelte'
	import ProfileDetails from '$lib/components/Pages/Company/ProfileDetails.svelte'
	import ProfileExecutives from '$lib/components/Pages/Company/ProfileExecutives.svelte'
	import ProfileSECfilings from '$lib/components/Pages/Company/ProfileSECfilings.svelte'

	import ProfileInfo from '$lib/components/Pages/Company/ProfileInfo.svelte'
	import StockLayout from '$lib/components/StockLayout.svelte'

	import type { Info } from '$lib/types/Info'

	export let data: any
	export let info: Info
</script>

<svelte:head>
	<title>{info.nameFull} ({info.ticker}) Company Profile & Overview</title>
	<meta
		name="description"
		content="Company profile for {info.nameFull} ({info.ticker}) with a description, list of executives, contact details and other key facts."
	/>
	<link rel="canonical" href="https://stockanalysis.com/stocks/{info.symbol}/company/" />
</svelte:head>

<StockLayout state={{ info, data }}>
	<div class="wrap">
		<div class="description">
			<h2>Company Description</h2>
			<div class="text-page">{@html data.description}</div>
		</div>

		<div class="profile">
			<ProfileInfo />
			<Sidebar1All />
			<ProfileContact />
			<ProfileDetails />
		</div>

		<div class="exec-sec">
			<ProfileExecutives />
			<ProfileSECfilings />
		</div>
		<div class="min-h-5 clear-both" />
	</div>
</StockLayout>

<style type="text/postcss">
	.wrap {
		@apply mt-4 sm:mt-5;
	}

	.description {
		@apply lg:w-[calc(100%-336px-40px)] float-none lg:float-left;
	}

	.profile {
		@apply float-none lg:float-right lg:w-[336px];
	}

	.exec-sec {
		@apply lg:w-[calc(100%-336px-40px)] float-none lg:float-left mb-2;
	}
</style>
