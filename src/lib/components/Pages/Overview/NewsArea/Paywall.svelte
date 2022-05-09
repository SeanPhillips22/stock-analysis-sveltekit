<script>
	import Button from '$lib/components/Buttons/Button.svelte'
	import ButtonWhite from '$lib/components/Buttons/ButtonWhite.svelte'
</script>

<div class="wrap">
	<div class="inner">
		<h4>Get unlimited news</h4>
		<p>Keep scrolling with a free 30-day trial of Stock Analysis Pro</p>
		<div class="btn-wrap">
			<div class="w-44">
				<Button href="/pro/" title="Free Trial" classes="w-44" />
			</div>
			<div class="w-44">
				<ButtonWhite href="/login/" title="Sign In" classes="w-44" />
			</div>
		</div>
	</div>
</div>

<style type="text/postcss">
	.wrap {
		@apply relative -mt-8 flex h-[180px] justify-center bg-white sm:mt-3 sm:h-auto;
	}

	.inner {
		@apply absolute max-w-[85%] text-center sm:static;
	}

	h4 {
		@apply mb-2.5 text-3xl font-semibold text-gray-900;
	}

	p {
		@apply mb-0.5 text-base font-medium text-gray-700;
	}

	.btn-wrap {
		@apply flex justify-center space-x-6 pt-6;
	}
</style>
