<script lang="ts">
	export let year: string | undefined = undefined
</script>

<nav>
	<ul class="navmenu">
		<li><a href="/ipos/" sveltekit:prefetch data-title="Latest" class:active={year === undefined}>Latest</a></li>
		<li><a href="/ipos/2022/" sveltekit:prefetch data-title="2022" class:active={year === '2022'}>2022</a></li>
		<li><a href="/ipos/2021/" sveltekit:prefetch data-title="2021" class:active={year === '2021'}>2021</a></li>
		<li><a href="/ipos/2020/" sveltekit:prefetch data-title="2020" class:active={year === '2020'}>2020</a></li>
		<li><a href="/ipos/2019/" sveltekit:prefetch data-title="2019" class:active={year === '2019'}>2019</a></li>
	</ul>
</nav>

<style>
	nav {
		@apply mb-1 sm:mb-2 lg:mb-3;
	}
</style>
