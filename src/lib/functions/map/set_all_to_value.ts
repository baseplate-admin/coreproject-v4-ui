export const set_all_to_value = <K, V>(map: SvelteMap<K, V>, value: V) => {
	[...map.keys()].forEach((key) => {
		map.set(key, value);
	});
	return map;
};
