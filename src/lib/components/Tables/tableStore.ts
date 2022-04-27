import { writable } from 'svelte/store'
import type { Sorted } from './types'

type Store = {
	sorted: Sorted
	filter: string
	page: number
	perPage?: number
}

export const state = writable<Store>({
	sorted: {},
	filter: '',
	page: 1
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

// Set the page number
export const setPage = (page: number) => {
	state.update((s) => {
		s.page = page
		return s
	})
}

// Set the rows per page
export const setPerPage = (perPage: number) => {
	state.update((s) => {
		s.perPage = perPage
		return s
	})
}
