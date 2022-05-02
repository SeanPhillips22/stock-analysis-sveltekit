import { writable } from 'svelte/store'
import type { Quote } from '$lib/types/Quote'

export const quote = writable<Quote>()

export const setQuote = (newQuote: Quote) => {
	quote.set(newQuote)
}
