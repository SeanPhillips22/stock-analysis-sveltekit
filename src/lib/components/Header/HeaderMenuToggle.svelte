<script lang="ts">
	import Hamburger from '$lib/icons/Hamburger.svelte'

	import { navigationOpen } from '$lib/stores/navigation'
	let showNavigation: boolean
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
