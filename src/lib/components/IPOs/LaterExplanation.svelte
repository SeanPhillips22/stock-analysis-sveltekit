<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte'
</script>

<div class="pb-1 lg:pb-0">
	<h2 class="hh2 mb-3 text-2xl font-semibold text-gray-800 lg:mb-4">After Next Week</h2>
	<div class="rounded border border-gray-300 bg-white p-3 sm:p-4">
		<div class="flex-row items-center sm:flex sm:space-x-4">
			<div class="float-left mr-1 shrink-0 sm:mr-0 sm:block">
				<InformationCircle classes="h-6 sm:h-7 w-6 sm:w-7 text-blue-400" />
			</div>
			<div class="flex-1 sm:ml-3 md:flex md:justify-between">
				<p class="text-base text-gray-900 md:text-lg">
					No IPOs have been scheduled after next week. The reason is that IPO dates are rarely set more than 7-10 days
					in advance. <a href="/ipos/filings/" sveltekit:prefetch>View unscheduled IPOs</a>.
				</p>
			</div>
		</div>
	</div>
</div>
