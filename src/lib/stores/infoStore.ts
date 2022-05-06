/**
 * Store the "info" object for each page. Keeping it in a store massively reduces boilerplate code
 * and I can import the data into a component in a single line, with types.
 */
import { writable } from 'svelte/store'
import type { Info } from '$lib/types/Info'

export const info = writable<Info>()
