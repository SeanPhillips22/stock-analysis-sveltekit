<script lang="ts">
	import { browser } from '$app/env'
</script>

<!-- {#if browser}
	<script src="https://www.dianomi.com/js/contextfeed.js" id="dianomi_context_script"></script>
{/if} -->

<div id="ad-banner" class="dianomi_context" data-dianomi-context-id="410" />

<style type="text/postcss">
	div {
		@apply py-4 min-h-[310px] diabp:min-h-[150px];
	}
</style>
