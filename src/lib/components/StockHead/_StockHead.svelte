<script lang="ts">
	import { page } from '$app/stores'
	import { quote, setQuote } from '$lib/stores/quoteStore'

	import type { Info } from '$lib/types/Info'
	import Quote from './PriceQuote.svelte'
	import StockNav from './Nav/StockNav.svelte'
	import InformationCircle from '$lib/icons/InformationCircle.svelte'
	import QuoteIpo from './QuoteIPO.svelte'
	import ETFNav from './Nav/ETFNav.svelte'
	export let info: Info
	let isIpo = info.state === 'upcomingipo'

	$: console.log($page.params.symbol, $quote?.symbol)
	$: if (!$quote || $page.params.symbol !== $quote?.symbol) {
		setQuote(info.quote)
	}
</script>

<div class="container">
	<div class="stock-head">
		<h1>{info.nameFull || info.name} ({info.ticker})</h1>
		{#if info.quote && !isIpo && !info.archived}
			<div class="details">{info.exchange}: {info.ticker} · IEX Real-Time Price · USD</div>
		{/if}

		{#if info.notice}
			<div class="notice">
				<InformationCircle classes="mb-1 mr-1 inline h-4 w-4 text-blue-400 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
				<span>{info.notice}</span>
			</div>
		{/if}
	</div>

	<!-- Stock Quote -->
	{#key info.symbol}
		{#if isIpo}
			<QuoteIpo {info} />
		{:else}
			<Quote {info} />
		{/if}
	{/key}

	<!-- Navigation -->
	{#if info.type === 'stocks'}
		<StockNav {info} />
	{:else}
		<ETFNav {info} />
	{/if}
</div>

<style type="text/postcss">
	.container {
		@apply mx-auto mb-2;
	}

	.stock-head {
		@apply mb-4;
	}

	h1 {
		@apply text-2xl font-bold text-gray-900 sm:text-[26px] mb-0;
	}

	.details {
		@apply mt-[1px] text-tiny text-gray-600;
	}

	.notice {
		@apply mt-2 text-base text-gray-700 sm:text-lg;
	}
</style>
