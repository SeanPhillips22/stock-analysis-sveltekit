<script lang="ts">
	import { info } from '$lib/stores/infoStore'
	export let title = 'Chart not available yet'
	export let description: string | undefined = undefined
	let message = $info.ipoInfo?.ipoDate
		? `Data will show when the stock starts trading on ${$info.ipoInfo.ipoDateFormatted}.`
		: 'Data will show when the stock starts trading.'

	export let borders = false
</script>

<div class="container">
	<div class="wrap" class:borders>
		<div class="inner">
			<div class="title">{title}</div>
			{#if description || message}
				<div class="message">{description || message}</div>
			{/if}
		</div>
	</div>
</div>

<style type="text/postcss">
	.container {
		@apply order-3 grow;
	}

	.wrap {
		@apply mb-4 flex h-[180px] w-full items-center justify-center rounded-sm  sm:h-[240px] lg:mb-0 lg:h-full;
	}

	.wrap.borders {
		@apply border border-gray-200 lg:border-0 lg:border-l lg:border-gray-300 lg:pl-3;
	}

	.inner {
		@apply flex h-full w-full flex-col items-center justify-center bg-gray-50 px-4 text-gray-800 xs:px-10;
	}

	.title {
		@apply text-xl font-medium xs:text-2xl lg:text-3xl;
	}

	.message {
		@apply mt-4 text-center text-base leading-6 xs:text-lg xs:leading-7;
	}
</style>
