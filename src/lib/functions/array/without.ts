// https://youmightnotneed.com/lodash#without
export const without = <T>(arr: T[], ...args: T[]): T[] =>
	arr.filter((item) => !args.includes(item));
