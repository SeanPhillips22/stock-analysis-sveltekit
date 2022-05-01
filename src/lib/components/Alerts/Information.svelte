<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte'
	export let message = ''
</script>

<div class="mt-5">
	<div class="border-l-4 border-blue-400 bg-blue-50 p-4 text-blue-700">
		<div class="flex flex-row items-center">
			<div class="shrink-0">
				<InformationCircle />
			</div>
			<div class="ml-3 sm:ml-4">
				<span class="text-base">{message}</span>
			</div>
		</div>
	</div>
</div>
