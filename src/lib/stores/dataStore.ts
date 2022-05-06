/**
 * Store the "data" object for each page. Keeping it in a store massively reduces boilerplate code
 * and I can import the data into a component in a single line, with types.
 */
import { writable } from 'svelte/store'

export const data = writable<any>()
