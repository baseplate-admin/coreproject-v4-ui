import { set_all_to_value } from "$functions/map/set_all_to_value";
import { Map } from "svelte/reactivity";

const modals = ["search"] as const;
type IModals = (typeof modals)[number];

let state = $state(new Map<IModals, boolean>(modals.map((item) => [item, false])));

export function createModalStore() {
	return {
		get state() {
			return state;
		},
		open_modal(name: IModals) {
			// Close all other modals
			set_all_to_value(state, false);
			state.set(name, true);
		},
		close_modal(name: IModals) {
			state.set(name, false);
		}
	};
}
