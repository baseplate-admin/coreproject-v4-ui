export const set_all_to_value = (map: Map<any, any>, value: any) => {
	[...map.keys()].forEach((key) => {
		map.set(key, value);
	});
	return map;
};
