<script lang="ts">
	export let page: string
</script>

<nav>
	<ul class="navmenu">
		<li>
			<a href="/ipos/calendar/" sveltekit:prefetch data-title="Upcoming" class:active={page === 'calendar'}>Upcoming</a>
		</li>
		<li>
			<a href="/ipos/filings/" sveltekit:prefetch data-title="Filings" class:active={page === 'filings'}>Filings</a>
		</li>
		<li>
			<a href="/ipos/withdrawn/" sveltekit:prefetch data-title="Withdrawn" class:active={page === 'withdrawn'}
				>Withdrawn</a
			>
		</li>
	</ul>
</nav>

<style>
	nav {
		@apply mb-1 sm:mb-2 lg:mb-3;
	}
</style>
