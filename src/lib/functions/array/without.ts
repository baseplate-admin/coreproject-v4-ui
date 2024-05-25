// https://youmightnotneed.com/lodash#without
export const without = <T>(arr: T[], ...args: T[]): T[] => {
	return arr.filter((item) => {
		return !args.includes(item);
	});
};
