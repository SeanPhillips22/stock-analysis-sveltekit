<script lang="ts">
	import { onMount } from 'svelte'

	onMount(() => {
		const dianomiJs = document.createElement('script')
		dianomiJs.src = 'https://www.dianomi.com/js/contextfeed.js'
		document.body.appendChild(dianomiJs)
	})
</script>

<div id="ad-banner" class="dianomi_context" data-dianomi-context-id="410" />

<style>
	div {
		@apply py-4 min-h-[310px] diabp:min-h-[150px];
	}
</style>
