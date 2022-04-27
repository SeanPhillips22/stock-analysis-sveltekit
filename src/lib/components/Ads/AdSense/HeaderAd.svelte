<script lang="ts">
	import { user } from '$lib/auth/userStore'
</script>

{#if !$user?.isPro}
	<div class="ad-banner wrap">
		<div class="ha1 placeholder">{' '}</div>
	</div>
{/if}

<style>
	.wrap {
		@apply mt-3 -mb-2 text-center;
	}

	.ha1 {
		@apply mx-auto block h-[50px] tiny:w-[300px] xs:h-[50px] xs:w-[320px] md:h-[90px] md:w-[728px];
	}

	.placeholder {
		@apply bg-slate-200;
	}
</style>
