export const uniq_by = <T, U>(arr: readonly T[], predicate: keyof T | ((item: T) => U)): T[] => {
	const cb = typeof predicate === "function" ? predicate : (o: T) => o[predicate];

	const picked_objects = arr
		.filter((item): item is T => !!item)
		.reduce((map, item) => {
			const key = cb(item);

			if (!key) {
				return map;
			}

			return map.has(key) ? map : map.set(key, item);
		}, new Map())
		.values();

	return Array.from(picked_objects);
};
