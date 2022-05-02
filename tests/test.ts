import { expect, test } from '@playwright/test'

test('index page has expected h1', async ({ page }) => {
	await page.goto('/')
	expect(await page.textContent('h1')).toBe('Search for a stock to start your analysis')
})

test('stock symbol page has expected h1', async ({ page }) => {
	await page.goto('/stocks/')
	expect(await page.textContent('h1')).toBe('All Stock Symbols')
})
