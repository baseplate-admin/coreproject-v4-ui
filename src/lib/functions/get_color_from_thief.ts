export function get_color_from_thief(color_codes: string[], opacity: number = 1): string {
	return `rgba(${color_codes.join(", ")}, ${opacity})`;
};
