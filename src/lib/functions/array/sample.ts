export const sample = <T>(arr: T[]): T | undefined =>
	arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined;
