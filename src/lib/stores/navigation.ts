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
		// Open the menu on mobile
		open: () => update((state) => ({ ...state, isOpen: false })),
		// close the menu if mobile or small screen
		close: (width: number) => {
			if (width < 1280) {
				update((state) => ({ ...state, isOpen: true }))
			}
		},
		// Force close the menu (or set it to its original "true" state)
		closeForced: () => update((state) => ({ ...state, isOpen: true })),
		// Set all the submenus
		setMenus: (menus: { [key: string]: boolean }) => update((state) => ({ ...state, menus })),
		// Toggle a single submenu
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
