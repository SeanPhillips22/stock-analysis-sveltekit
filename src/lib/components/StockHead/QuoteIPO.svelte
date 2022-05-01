<script lang="ts">
	/**
	 * If stock is an upcoming IPO, then this is what shows instead of the
	 * live stock price quote.
	 */
	import type { Info } from '$lib/types/Info'

	export let info: Info
	let ipo = info.ipoInfo

	let price = ''
	if (ipo) {
		if (ipo.ipoPrice) {
			price = '$' + ipo.ipoPrice
		} else if (ipo && ipo.ipoPriceLow && ipo.ipoPriceHigh) {
			price = '$' + ipo.ipoPriceLow + ' - $' + ipo.ipoPriceHigh
		} else {
			price = 'Pending'
		}
	}
</script>

<div class="wrap">
	<div class="price">
		Stock Price: <span>{price}</span>
	</div>
	<div class="price-info">{ipo?.ipoPriceNotice}</div>
</div>

<style type="text/postcss">
	.wrap {
		@apply mb-5;
	}

	.price {
		@apply text-xl text-gray-800;
	}

	.price span {
		@apply text-2xl font-semibold;
	}

	.price-info {
		@apply mt-0 text-small text-gray-700;
	}
</style>
