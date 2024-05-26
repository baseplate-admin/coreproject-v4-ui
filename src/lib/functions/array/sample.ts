export const sample = <T>(arr: T[]): T | undefined => {
	const len = arr == null ? 0 : arr.length;
	return len ? arr[Math.floor(Math.random() * len)] : undefined;
};
