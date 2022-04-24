<script>
	export let time
</script>

<div>
	<ul class="price-controls">
		<li>
			<button class:active={time === '1D'} on:click={() => (time = '1D')}>
				<span>1D</span>
				<span>1 Day</span>
			</button>
		</li>
		<li>
			<button class:active={time === '5D'} on:click={() => (time = '5D')}>
				<span>5D</span>
				<span>5 Days</span>
			</button>
		</li>
		<li>
			<button class:active={time === '1M'} on:click={() => (time = '1M')}>
				<span>1M</span>
				<span>1 Month</span>
			</button>
		</li>
		<li>
			<button class:active={time === 'YTD'} on:click={() => (time = 'YTD')}>YTD</button>
		</li>
		<li>
			<button class:active={time === '1Y'} on:click={() => (time = '1Y')}>
				<span>1Y</span>
				<span>1 Year</span>
			</button>
		</li>
		<li>
			<button class:active={time === '5Y'} on:click={() => (time = '5Y')}>
				<span>5Y</span>
				<span>5 Years</span>
			</button>
		</li>
		<li>
			<button class:active={time === 'MAX'} on:click={() => (time = 'MAX')}>Max</button>
		</li>
	</ul>
</div>

<style>
	.price-controls {
		@apply hide-scroll flex space-x-[3px] whitespace-nowrap pl-0.5 xs:space-x-1;
	}

	.price-controls > li > button {
		@apply rounded-md py-1 px-0.5 text-smaller xs:px-[3px] bp:px-1.5 sm:px-2;
	}

	.price-controls > li > button {
		@apply sm:px-3;
	}

	.price-controls > li > button {
		@apply hover:bg-gray-100 text-gray-900 hover:text-gray-900;
	}

	.price-controls > li > button.active {
		@apply font-semibold text-gray-800 bp:bg-gray-100;
	}

	.price-controls > li > button > span:first-child {
		@apply block sm:hidden lg:block xl:hidden;
	}

	.price-controls > li > button > span:last-child {
		@apply hidden sm:block lg:hidden xl:block;
	}
</style>
