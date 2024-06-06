let state = $state.frozen<null | boolean>(null);

export function createAuthStore() {
	return {
		get state() {
			return state;
		},
		set state(value: null | boolean) {
			state = value;
		}
	};
}
