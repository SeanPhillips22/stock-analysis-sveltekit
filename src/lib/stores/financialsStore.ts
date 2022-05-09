import { writable } from 'svelte/store'

type FinancialsState = {
	leftToRight: boolean
	showTTM: boolean
	showCurrent: boolean
	divider: 'Billions' | 'Millions' | 'Thousands' | 'Raw'
	showOnMobile: boolean
}

export const state = writable<FinancialsState>({
	leftToRight: false,
	showTTM: false,
	showCurrent: false,
	divider: 'Millions',
	showOnMobile: false
})
