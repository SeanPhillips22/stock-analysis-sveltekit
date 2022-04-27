import { writable } from 'svelte/store'
import type { User } from './types'

export const user = writable<User>(null)

export const setIsPro = (isPro: boolean) => {
	user.update((u) => {
		if (u) {
			return { ...u, isPro }
		}
	})
}
