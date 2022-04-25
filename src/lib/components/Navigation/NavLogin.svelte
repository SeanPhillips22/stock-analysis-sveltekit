<div class="mt-auto flex flex-col xxl:hidden gap-y-3 mb-6 px-3">
	<button class="button-blue">
		<a href="/pro/">Free Trial</a>
	</button>
	<button class="button-white">
		<a href="/login/">Log In</a>
	</button>
</div>

<style>
	.button-white {
		@apply inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-lg font-semibold rounded-sm text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500;
	}

	.button-white a {
		@apply text-gray-900;
		color: #111827;
	}

	.button-blue {
		@apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-lg font-semibold rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-brand_light text-white hover:bg-blue-brand_sharp whitespace-nowrap;
		background-color: #3c74d4;
	}

	.button-blue a {
		@apply text-white;
		color: #ffffff;
	}
</style>
