<script lang="ts">
	export let page: string
</script>

<nav>
	<ul class="navmenu">
		<li>
			<a href="/ipos/" sveltekit:prefetch data-title="IPOs" class:active={page === 'recent'}>Recent</a>
		</li>
		<li>
			<a href="/ipos/calendar/" sveltekit:prefetch data-title="Calendar" class:active={page === 'calendar'}>Calendar</a>
		</li>
		<li>
			<a href="/ipos/statistics/" sveltekit:prefetch data-title="Statistics" class:active={page === 'statistics'}
				>Statistics</a
			>
		</li>
		<li>
			<a href="/ipos/news/" sveltekit:prefetch data-title="News" class:active={page === 'news'}>News</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		@apply mb-1.5 border-b-[3px] border-blue-brand_sharp;
	}
</style>
