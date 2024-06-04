const modals = ["search"] as const;
type IModals = (typeof modals)[number];

export function createModalStore() {
	let state = $state(Object.fromEntries(modals.map((item) => [item, false])));

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
