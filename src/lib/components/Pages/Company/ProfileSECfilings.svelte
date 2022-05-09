<script lang="ts">
	import { info } from '$lib/stores/infoStore'
	import { data } from '$lib/stores/dataStore'
	$: filings = $data?.secFilings?.filings
	$: updated = $data?.secFilings?.updated

	async function fetchNewSecFilings() {
		let host = import.meta.env.VITE_PUBLIC_API_URL
		let url = `${host}/sec?cik=${$info.cik}&c=10&s=${$info.symbol}&t=stocks&json=1`

		try {
			let res = await fetch(url)
			let json = await res.json()

			if (json) {
				if (!filings?.length || json.filings[0].time !== filings[0]?.time) {
					filings = json.filings
				}
			}
		} catch (e) {
			console.error(e)
		}
	}

	let fetched: any = []
	$: {
		if (!fetched.includes($info.cik)) {
			fetched = [...fetched, $info.cik]
			let now = new Date().getTime()
			let timestamp = Date.parse(updated)
			let diff = (now - timestamp) / 1000

			if ((filings && !filings.length) || diff > 12 * 60 * 60 || isNaN(diff) || !updated) {
				fetchNewSecFilings()
			}
		}
	}
</script>

{#if filings}
	<h2>Latest SEC Filings</h2>
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Type</th>
				<th>Title</th>
			</tr>
		</thead>
		<tbody>
			{#each filings as filing (filing.url)}
				<tr>
					<td class="time" title={filing['time']}>{filing['cleantime']}</td>
					<td class="type">{filing['type']}</td>
					<td class="title">
						<a href={filing['url']} target="_blank" rel="noopener noreferrer">
							{filing['title']}
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="more">
		<a
			href="https://www.sec.gov/cgi-bin/browse-edgar?CIK={$info.cik}&count=100"
			target="_blank"
			rel="noopener noreferrer"
		>
			View All SEC Filings
		</a>
	</div>
{/if}

<style type="text/postcss">
	table {
		@apply w-full text-smaller bp:text-base;
	}

	thead tr {
		@apply border-b border-t border-gray-200 bg-gray-50;
	}

	th {
		@apply py-2 px-1 text-left text-gray-800 xs:px-2;
	}

	tbody tr {
		@apply border-b border-gray-200;
	}

	.time {
		@apply whitespace-nowrap py-3 pr-1 align-top text-gray-900 xs:px-2;
	}

	.type {
		@apply py-3 px-1 align-top text-gray-900 xs:px-2;
	}

	.title {
		@apply py-3 pl-1 align-top xs:px-2;
	}

	.more {
		@apply border-b border-gray-200 py-3 px-4 text-xl font-medium;
	}
</style>
