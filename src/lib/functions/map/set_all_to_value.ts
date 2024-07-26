export const set_all_to_value = <K, V>(map: Map<K, V>, value: V) =>
	[...map.keys()].forEach((key) => {
		map.set(key, value);
	});
