<script lang="ts">
	/**
	 * A YouTube embed that shows a thumbnail and a play button, only loads the iframe
	 * after the play button has been clicked.
	 * Adapted from here: https://github.com/ibrahimcesar/react-lite-youtube-embed
	 */
	import { onDestroy, onMount } from 'svelte'

	export let id: string
	export let title: string

	let iframe = false
	const videoId = encodeURIComponent(id)
	const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`

	const loadIframe = () => {
		if (!iframe) iframe = true
	}

	/**
	 * Lazy loading functionality
	 *
	 * Use the IntersectionObserver API to only load the background image when the
	 * element is within 200px of the viewport
	 */
	let thumbnail = `background-color: #eee;`
	let wrap: any
	let observer: any
	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined') {
			observer = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							thumbnail = `background-image: url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg);`
							observer.unobserve(wrap)
						}
					})
				},
				{
					root: null,
					rootMargin: '200px 200px 200px 200px',
					threshold: 0.01
				}
			)
			observer.observe(wrap)
		} else {
			thumbnail = `background-image: url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg);`
		}
	})

	onDestroy(() => {
		if (observer) observer.unobserve(wrap)
	})
</script>

<div
	bind:this={wrap}
	on:click={loadIframe}
	on:keydown={(e) => {
		if (e.key === 'Enter') loadIframe()
	}}
	class="yt-lite"
	class:active={iframe}
	data-title={title}
	style={thumbnail}
	tabIndex="0"
>
	<div class="lty-playbtn" />
	{#if iframe}
		<iframe
			{title}
			width="560"
			height="315"
			frameBorder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			src={iframeSrc}
		/>
	{/if}
</div>

<style type="text/postcss">
	.yt-lite {
		background-color: #000;
		position: relative;
		display: block;
		contain: content;
		background-position: 50%;
		background-size: cover;
		cursor: pointer;
	}
	.yt-lite:not(.active) {
		@apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-brand_light rounded-sm;
	}
	.yt-lite:after {
		content: '';
		display: block;
		padding-bottom: 56.25%;
	}
	.yt-lite > iframe {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.yt-lite > .lty-playbtn {
		width: 70px;
		height: 46px;
		background-color: #212121;
		z-index: 1;
		opacity: 0.8;
		border-radius: 14%;
		transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
	}
	.yt-lite:hover > .lty-playbtn {
		background-color: red;
		opacity: 1;
	}
	.yt-lite > .lty-playbtn:before {
		content: '';
		border-color: transparent transparent transparent #fff;
		border-style: solid;
		border-width: 11px 0 11px 19px;
	}
	.yt-lite > .lty-playbtn,
	.yt-lite > .lty-playbtn:before {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
	}
	.yt-lite.active {
		cursor: unset;
	}
	.yt-lite.active:before,
	.yt-lite.active > .lty-playbtn {
		opacity: 0;
		pointer-events: none;
	}
</style>
