<script lang="ts">
	import ErrorIcon from '$lib/icons/Error.svelte'
	export let message = ''
</script>

<div class="my-5">
	<div class="border-l-4 border-red-400 bg-red-50 p-4 text-red-700">
		<div class="flex flex-row items-center">
			<div class="shrink-0">
				<ErrorIcon />
			</div>
			<div class="ml-3 sm:ml-4">
				<span class="text-base">{message}</span>
			</div>
		</div>
	</div>
</div>
