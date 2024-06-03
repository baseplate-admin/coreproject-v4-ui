
export function createModalStore() {
	const modals = ["search"] as const;
	type IModals = (typeof modals)[number];

	let state = $state(new Map<IModals, boolean>(modals.map((item) => [item, false])));

	return {
		get state() {
			return state;
		},
		get_modal_state(name: IModals) {
			return state.get(name);
		},
		open_modal(name: IModals) {
			state.set(name, true);
		}
	};
}
