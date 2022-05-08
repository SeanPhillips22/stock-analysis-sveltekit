<script lang="ts">
	/**
	 * Export data as Excel or CSV
	 */
	import ExcellentExport from 'excellentexport'

	export let data: any | undefined = undefined

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
