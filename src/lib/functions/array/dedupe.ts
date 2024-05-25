export const dedupe = <T>(array: T[]): T[] => {
	return [...new Set(array)];
};
