import { writable } from 'svelte/store'
import type { Info } from '$lib/types/Info'

export const info = writable<Info>()

export const setInfo = (newInfo: Info) => {
	info.set(newInfo)
}
