<script lang="ts">
	import { data } from '$lib/stores/dataStore'
</script>

<div class="wrap">
	<div>
		Dividend Yield
		<div class="data">{$data.infoTable.yield}</div>
	</div>
	<div>
		Annual Dividend
		<div class="data">{$data.infoTable.annual}</div>
	</div>
	<div>
		Ex-Dividend Date
		<div class="data">{$data.infoTable.exdiv}</div>
	</div>
	<div>
		Payout Frequency
		<div class="data">{$data.infoTable.frequency}</div>
	</div>
	<div>
		Payout Ratio
		<div class="data">{$data.infoTable.payoutRatio}</div>
	</div>
	<div>
		Dividend Growth<span class="hidden bp:visible"> (1Y)</span>
		<div class="data">{$data.infoTable.growth}</div>
	</div>
</div>

<style type="text/postcss">
	.wrap {
		@apply mt-6 grid grid-cols-2 gap-3 px-1 text-base bp:mt-7 bp:text-lg sm:grid-cols-3 sm:gap-6 sm:px-4 sm:text-xl;
	}

	.data {
		@apply mt-0.5 text-lg font-semibold bp:text-xl sm:mt-1.5 sm:text-2xl;
	}
</style>
