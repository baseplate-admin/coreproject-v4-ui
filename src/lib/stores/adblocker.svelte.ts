let _state: null | boolean = state(null);

export function createAdblockerStore() {
	return {
		get state() {
			return _state;
		},
		set state(value: boolean | null) {
			_state = value;
		}
	};
}
