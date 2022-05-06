<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte'
	export let text: string
</script>

<div class="wrap">
	<div class="inner">
		<div class="icon">
			<InformationCircle classes="h-6 sm:h-7 w-6 sm:w-7 text-blue-400" />
		</div>
		<div class="text-wrap">
			<p>{text}</p>
		</div>
	</div>
</div>

<style type="text/postcss">
	.wrap {
		@apply rounded border border-gray-300 bg-white p-3 sm:p-4;
	}

	.inner {
		@apply flex-row items-center sm:flex sm:space-x-4;
	}

	.icon {
		@apply float-left mr-1 shrink-0 sm:mr-0 sm:block;
	}

	.text-wrap {
		@apply flex-1 sm:ml-3 md:flex md:justify-between;
	}

	p {
		@apply text-base md:text-lg;
	}
</style>
