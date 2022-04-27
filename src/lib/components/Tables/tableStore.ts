import { writable } from 'svelte/store'
import type { Sorted } from './types'

type Store = {
	sorted: Sorted
	filter: string
}

export const state = writable<Store>({
	sorted: {},
	filter: ''
})

// Set a new sort state
export const setSort = (id: string, sortType: 'asc' | 'desc') => {
	state.update((s) => {
		s.sorted[id] = sortType
		return s
	})
}

// Reset the sort state
export const resetSort = () => {
	state.update((s) => {
		s.sorted = {}
		return s
	})
}

// Set the filter value
export const setFilter = (filter: string) => {
	state.update((s) => {
		s.filter = filter
		return s
	})
}
