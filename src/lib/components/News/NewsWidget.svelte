<script lang="ts">
	import Button from '../Buttons/Button.svelte'

	import type { NewsMinimal } from './types'

	export let title: string
	export let news: NewsMinimal[]
	export let button: {
		href: string
		title: string
	}
</script>

<div class="wrap">
	<h3>{title}</h3>
	<ul>
		{#each news as item, i (i + item.title)}
			<li>
				{item.time} - <a href={item.url} target="_blank" rel="noopener noreferrer nofollow">{item.title}</a> - {item.source}
			</li>
		{/each}
	</ul>
	<Button href={button.href} title={button.title} classes="w-full mt-4" />
</div>

<style type="text/postcss">
	.wrap {
		@apply rounded border border-gray-200 p-4 text-sm;
	}

	ul {
		@apply text-gray-700;
	}

	ul li {
		@apply mb-3 last:mb-1;
	}
</style>
