<script>
	// Display the stock price quote, for either a stock or ETF
	// It's either one or two blocks depending on whether extended hour
	// trading info is available
	import { onMount, onDestroy } from 'svelte'
	import SunIcon from '$lib/icons/Sun.svelte'
	import MoonIcon from '$lib/icons/Moon.svelte'

	export let info

	// Replace react query with own
	// When component is mounted, create an interval to fetch the
	// stock price every 5 seconds
	let refetch
	let freshQuote
	onMount(() => {
		refetch = setInterval(async () => {
			try {
				const resB = await fetch(`https://api.stockanalysis.com/wp-json/sa/p?s=${info.symbol}&t=stocks`)
				const dataB = await resB.json()
				freshQuote = dataB
			} catch (e) {
				clearInterval(refetch)
			}
		}, 5000)
	})

	// When component is unmounted, stop the interval
	onDestroy(() => {
		clearInterval(refetch)
	})

	// info.quote is used as the initialdata until freshQuote has been set
	$: quote = freshQuote ? freshQuote : info.quote

	// Set the change color based on the change in price
	let color
	$: if (quote.c > 0) color = 'qg'
	else if (quote.c < 0) color = 'qr'
	else color = 'qgr'

	let extendedColor
	$: if (quote.ec > 0) extendedColor = 'qg'
	else if (quote.ec < 0) extendedColor = 'qr'
	else extendedColor = 'qgr'
</script>

<div class="container">
	<div class:extended={quote.e}>
		<div class="p">{quote.pd}</div>
		{#key quote.c}
			<div class="pc {color}">{quote.c} ({quote.cp}%)</div>
		{/key}

		<!-- Change timestamp slightly if there is an extended hours quote -->
		{#if quote.e}
			<div class="und"><span>At close:</span> {quote.u}</div>
		{:else}
			<div class="u">{quote.u} - Market {quote.ms}</div>
		{/if}
	</div>

	<!-- Extended quote shown to the right -->
	{#if quote.e}
		<div class="ext split">
			<div class="p-ext">{quote.epd}</div>
			<div class="pc-ext {extendedColor}">{quote.ec} ({quote.ecp}%)</div>
			<div class="und">
				<span class="sp1">
					{#if quote.es === 'Pre-market'}
						<SunIcon />
					{:else}
						<MoonIcon />
					{/if}
					<span class="sp2">{quote.es}:</span>
				</span>
				<span class="sp3">{quote.eu}</span>
			</div>
		</div>
	{/if}
</div>

<style>
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
