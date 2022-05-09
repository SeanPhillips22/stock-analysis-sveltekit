<script lang="ts">
	import { info } from '$lib/stores/infoStore'

	let nasdaqLink = `<a href="https://data.nasdaq.com/" target="_blank" rel="noopener noreferrer" className="bll">Nasdaq Data Link</a>`
	let secS1 = `<a href="https://www.sec.gov/cgi-bin/browse-edgar?CIK=${$info.cik}&type=S-1" target="_blank" rel="noopener noreferrer" className="bll">S-1 and S-1/A filings</a>`
	let secGeneric = `<a href="https://www.sec.gov/cgi-bin/browse-edgar?CIK=${$info.cik}" target="_blank" rel="noopener noreferrer" className="bll">Securities and Exchange Commission</a>`
	let sec10K = `<a href="https://www.sec.gov/cgi-bin/browse-edgar?CIK=${$info.cik}&type=10-K" target="_blank" rel="noopener noreferrer" className="bll">10-K</a>`
	let sec10Q = `<a href="https://www.sec.gov/cgi-bin/browse-edgar?CIK=${$info.cik}&type=10-Q" target="_blank" rel="noopener noreferrer" className="bll">10-Q</a>`
</script>

<div class="wrap">
	{#if $info.cik && $info.exchange !== 'OTCMKTS'}
		{#if $info.state === 'upcomingipo' || ($info.state === 'newipo' && $info.daysSince && $info.daysSince < 5)}
			<!-- prettier-ignore -->
			Source: IPO financials are sourced from {@html secS1} submitted to the Securities and Exchange Commission (SEC).
		{:else if $info.currency !== 'USD'}
			<!-- prettier-ignore -->
			Source: Financials are provided by {@html nasdaqLink} and sourced from audited reports submitted to the {@html secGeneric}
			(SEC).
		{:else}
			<!-- prettier-ignore -->
			Source: Financials are provided by {@html nasdaqLink} and sourced from the audited annual ({@html sec10K}) and quarterly
			({@html sec10Q}) reports submitted to the Securities and Exchange Commission (SEC).
		{/if}
	{/if}
</div>

<style type="text/postcss">
	.wrap {
		@apply mt-1.5 text-[0.85rem] text-gray-600;
	}
</style>
