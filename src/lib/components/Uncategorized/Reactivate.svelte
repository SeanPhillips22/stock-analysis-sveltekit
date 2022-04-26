<!-- TODO set up the upgradeComplete callback function -->
<script lang="ts">
	import { onMount } from 'svelte'

	export let email: string | undefined
	export let status: string | undefined

	// Load the Paddle javascript once the component has mounted
	onMount(() => {
		const paddleJs = document.createElement('script')
		paddleJs.src = 'https://cdn.paddle.com/paddle/paddle.js'
		document.body.appendChild(paddleJs)

		paddleJs.onload = () => {
			// @ts-ignore
			window.Paddle.Setup({ vendor: 128917 })
		}
	})

	// Begin Paddle checkout with overlay
	function checkout(productId: number) {
		// @ts-ignore
		window.Paddle.Checkout.open({
			product: productId,
			email: email,
			successCallback: upgradeComplete
		})
	}

	async function upgradeComplete(data: any) {
		// TODO complete later
	}
</script>

{#if !status}
	<p>There is no active subscription on this account.</p>

	<div class="bll cursor-pointer font-semibold" on:click={() => checkout(649892)}>
		Start your free 30-day trial now.
	</div>
{:else if !['deleted', 'cancelled', 'paused'].includes(status)}
	<div class="bll cursor-pointer font-semibold" on:click={() => checkout(747289)}>
		Reactivate your Stock Analysis Pro subscription.
	</div>
{/if}
