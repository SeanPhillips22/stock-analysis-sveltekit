<script lang="ts">
	import { user } from '$lib/auth/userStore'
</script>

{#if !$user?.isPro}
	<div class="ad-banner wrap">
		<div class="sb1 placeholder">{' '}</div>
	</div>
{/if}

<style>
	.wrap {
		@apply text-center;
	}

	.sb1 {
		@apply mx-auto mt-8 block h-[250px] w-full xs:w-[300px] bp:h-[280px] bp:w-[336px] md:h-[90px] md:w-[728px] lg:h-[280px] lg:w-[336px];
	}

	.placeholder {
		@apply bg-slate-200;
	}
</style>
