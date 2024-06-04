import { Map } from "svelte/reactivity";
import { set_all_to_value } from "$functions/map/set_all_to_value";

const modals = ["search"] as const;
type IModals = (typeof modals)[number];

const state = $state.frozen(new Map<IModals, boolean>(modals.map((item) => [item, false])));

export function createModalStore() {
	return {
		get state() {
			return state;
		},
		open_modal(name: IModals) {
			if (!state.has(name)) throw Error(`Add ${name} to ${modals}`);

			/* Close all other modals */
			set_all_to_value(state, false);
			state.set(name, true);
		},
		close_modal(name: IModals) {
			state.set(name, false);
		}
	};
}
