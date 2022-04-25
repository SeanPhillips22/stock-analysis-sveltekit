import { writable, type Writable } from 'svelte/store'

export type State = {
	isOpen: boolean
	menus: { [key: string]: boolean }
}

function createNavigationState() {
	const { subscribe, update } = writable<State>({
		isOpen: true,
		menus: {}
	})

	return {
		subscribe,
		open: () => update((state) => ({ ...state, isOpen: false })),
		close: () => update((state) => ({ ...state, isOpen: true })),
		setMenus: (menus: { [key: string]: boolean }) => update((state) => ({ ...state, menus })),
		toggleMenu: (menu: string) =>
			update((state) => ({
				...state,
				menus: {
					...state.menus,
					[menu]: !state.menus[menu] || false
				}
			}))
	}
}

export const state = createNavigationState()
