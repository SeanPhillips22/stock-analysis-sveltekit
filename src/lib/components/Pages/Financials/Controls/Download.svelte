<script lang="ts">
	/**
	 * Export data as Excel or CSV
	 *
	 * TODO - Add bulk export
	 */
	import { getContext, onMount } from 'svelte'
	import ExcellentExport from 'excellentexport'
	export let data: any | undefined = undefined

	import type { Info } from '$lib/types/Info'
	import { buildReturnArray } from '../functions'
	let info: Info = getContext('info')

	/**
	 * Fetch the data for the bulk export
	 */
	let bulkData: any
	onMount(async () => {
		let host = import.meta.env.VITE_PUBLIC_API_URL
		let PRO_KEY = import.meta.env.VITE_PUBLIC_PRO_KEY
		let url = `${host}/financials-export?s=${info.symbol}&f=${PRO_KEY}`

		const res = await fetch(url)
		const bulkFetch = await res.json()

		if (bulkFetch?.data) {
			bulkData = buildReturnArray(bulkFetch.data)
		}
	})

	/**
	 * Execute the bulk export
	 */
	function bulkExport() {
		return ExcellentExport.convert(
			{
				openAsDownload: true,
				filename: `${info.symbol}-financials`,
				format: 'xlsx'
			},
			bulkData
		)
	}

	/**
	 * Execute a regular export
	 */
	function download(type: 'csv' | 'xlsx') {
		return ExcellentExport.convert(
			{
				openAsDownload: true,
				filename: 'export',
				format: type
			},
			[
				{
					name: 'Export',
					from: { array: data }
				}
			]
		)
	}
</script>

<div class="dd" on:click={() => download('xlsx')}>Export to Excel</div>
<div class="dd" on:click={() => download('csv')}>Export to CSV</div>
<div class="dd" on:click={() => bulkExport()}>Bulk Export</div>
