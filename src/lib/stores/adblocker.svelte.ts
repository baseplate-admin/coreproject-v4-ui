let state = $state<null | boolean>(null);

export function createAdblockerStore() {
	return {
		get state() {
			return state;
		},
		set state(value: boolean | null) {
			state = value;
		}
	};
}
