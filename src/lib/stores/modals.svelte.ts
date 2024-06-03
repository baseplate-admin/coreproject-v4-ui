import { get, writable } from "svelte/store";

const modals = ["search"] as const;
type IModals = (typeof modals)[number];

export let modal_store = writable(Object.fromEntries(modals.map((item) => [item, false])));

export function open_modal(name: IModals) {
	const obj = get(modal_store);
	// Close all other modals
	Object.keys(obj).forEach((v) => (obj[v] = false));
	obj[name] = true;
	modal_store.set(obj);
}

export function close_modal(name: IModals) {
	const obj = get(modal_store);
	obj[name] = false;
	modal_store.set(obj);
}
