import { Map } from "svelte/reactivity";
import { set_all_to_value } from "$functions/map/set_all_to_value";

const modals = ["search"] as const;
type IModals = (typeof modals)[number];

let state_map = $state(new Map<IModals, boolean>(modals.map((item) => [item, false])));

export function createModalStore() {
	return {
		get state() {
			return state_map;
		},
		open_modal(name: IModals) {
			if (!state_map.has(name)) throw Error(`Add ${name} to ${modals}`);

			/* Close all other modals */
			set_all_to_value(state_map, false);
			state_map.set(name, true);
		},
		close_modal(name: IModals) {
			state_map.set(name, false);
		}
	};
}
