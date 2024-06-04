const modals = ["search"] as const;
type IModals = (typeof modals)[number];

let state = $state(Object.fromEntries(modals.map((item) => [item, false])));

export function createModalStore() {
	return {
		get state() {
			return state as Record<IModals, boolean>;
		},
		open_modal(name: IModals) {
			// Close all other modals
			Object.keys(state).forEach((v) => (state[v] = false));
			state[name] = true;
		},
		close_modal(name: IModals) {
			state[name] = false;
		}
	};
}
