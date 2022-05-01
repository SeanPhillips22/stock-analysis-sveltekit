<script lang="ts">
	import { user } from '$lib/auth/userStore'
</script>

{#if !$user?.isPro}
	<div class="ad-banner wrap">
		<div class="sb1 placeholder">{' '}</div>
	</div>
{/if}

<style type="text/postcss">
	.wrap {
		@apply text-center;
	}

	.sb1 {
		@apply mx-auto hidden h-[250px] w-[300px] lg:block;
	}

	.placeholder {
		@apply bg-slate-200;
	}
</style>
