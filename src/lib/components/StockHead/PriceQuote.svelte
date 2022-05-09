<script lang="ts">
	/**
	 * Display the stock price quote, for either a stock or ETF
	 * It's either one or two blocks depending on whether extended hour
	 * trading info is available
	 *
	 * TODO add a check whether quote is outdated before fetching immediately when market is closed
	 */
	import { onMount, onDestroy } from 'svelte'
	import { page } from '$app/stores'
	import { info } from '$lib/stores/infoStore'

	import { quote } from '$lib/stores/quoteStore'
	import { marketOpen } from '$lib/functions/datetime/marketOpen'

	import SunIcon from '$lib/icons/Sun.svelte'
	import MoonIcon from '$lib/icons/Moon.svelte'

	/**
	 * Fetch quote data
	 * On first page load, fetch once
	 * If market is not closed, fetch every 5 seconds
	 */
	let refetch: ReturnType<typeof setInterval>

	async function fetchQuote() {
		try {
			let host = import.meta.env.VITE_PUBLIC_API_URL
			let url = `${host}/p?s=${$info.symbol}&t=${$info.type}`

			const res = await fetch(url)
			const data = await res.json()
			$quote = data
		} catch (e) {
			console.error(e)
			clearInterval(refetch)
		}
	}

	onMount(() => {
		fetchQuote()
		if (marketOpen() !== 'closed') {
			refetch = setInterval(async () => {
				// If navigated away from the page, stop the interval
				if (!$page.url.pathname.includes($info.symbol)) {
					clearInterval(refetch)
				} else {
					fetchQuote()
				}
			}, 5000)
		}
	})

	// When component is unmounted, stop the interval
	onDestroy(() => {
		clearInterval(refetch)
	})

	// Set the change color based on the change in price
	let color: string
	$: if (Number($quote?.c) > 0) color = 'qg'
	else if (Number($quote?.c) < 0) color = 'qr'
	else color = 'qgr'

	let extendedColor: string
	$: if (Number($quote?.ec) > 0) extendedColor = 'qg'
	else if (Number($quote?.ec) < 0) extendedColor = 'qr'
	else extendedColor = 'qgr'
</script>

<div class="container">
	<div class:extended={$quote?.e}>
		<div class="p">{$quote?.pd}</div>
		{#key $quote?.c}
			<div class="pc {color}">{$quote?.c} ({$quote?.cp}%)</div>
		{/key}

		<!-- Change timestamp slightly if there is an extended hours quote -->
		{#if $quote?.e}
			<div class="und"><span>At close:</span> {$quote?.u}</div>
		{:else}
			<div class="u">{$quote?.u} - Market {$quote?.ms}</div>
		{/if}
	</div>

	<!-- Extended quote shown to the right -->
	{#if $quote?.e}
		<div class="ext split">
			<div class="p-ext">{$quote?.epd}</div>
			<div class="pc-ext {extendedColor}">{$quote?.ec} ({$quote?.ecp}%)</div>
			<div class="und">
				<span class="sp1">
					{#if $quote?.es === 'Pre-market'}
						<SunIcon />
					{:else}
						<MoonIcon />
					{/if}
					<span class="sp2">{$quote?.es}:</span>
				</span>
				<span class="sp3">{$quote?.eu}</span>
			</div>
		</div>
	{/if}
</div>

<style type="text/postcss">
	.container {
		@apply mb-5 flex flex-row items-end space-x-6 lg:space-x-4;
	}

	.extended {
		@apply max-w-[50%];
	}

	/* Regular hours quote */
	.p {
		@apply inline-block text-4xl font-bold;
	}

	.extended .p {
		@apply block sm:inline;
	}

	.pc {
		@apply inline-block text-2xl font-semibold;
	}

	.extended .pc {
		@apply block text-lg font-semibold xs:text-xl sm:inline sm:text-2xl;
	}

	.u {
		@apply mt-1 flex items-center text-sm text-gray-700;
	}

	.qg {
		@apply text-green-700;
		color: #15803c;
	}

	.qg::before {
		content: '+';
	}

	.qr {
		@apply text-red-600;
		color: #dc2626;
	}

	.qgr {
		@apply text-gray-800;
		color: #1f2937;
	}

	.ext {
		@apply border-l border-gray-200 pl-5;
	}

	.p-ext {
		@apply block text-[1.7rem] font-semibold leading-5 text-gray-700 sm:inline;
	}

	.pc-ext {
		@apply mt-1.5 block text-sm xs:text-base sm:mt-0 sm:inline sm:text-lg;
	}

	.und {
		@apply mt-1 text-xxs text-gray-700 xs:text-tiny sm:flex;
	}

	.extended .und {
		@apply mt-0.5 text-xxs text-gray-700 xs:text-tiny bp:text-sm;
	}

	.sp1 {
		@apply flex items-center;
	}
	.sp2 {
		@apply ml-1 font-semibold whitespace-nowrap;
	}
	.sp3 {
		@apply sm:ml-1;
	}

	.extended .und span {
		@apply block font-semibold sm:inline mr-1;
	}
</style>
