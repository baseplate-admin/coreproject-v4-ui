let state = $state.frozen<null | boolean>(null);

export function createAuthStore() {
	return {
		get state() {
			return state;
		},
		toggle_auth() {
			state != state;
		}
	};
}
