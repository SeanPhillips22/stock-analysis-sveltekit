<script>
	import Hamburger from '$lib/icons/Hamburger.svelte'

	import { navigationOpen } from '$lib/stores/navigation'
	let showNavigation
	navigationOpen.subscribe((value) => {
		showNavigation = value
	})

	function toggle() {
		navigationOpen.set(!showNavigation)
	}
</script>

<div on:click={toggle}>
	<Hamburger classes="header-menu-icon" />
</div>
