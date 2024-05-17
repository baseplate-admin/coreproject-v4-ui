export function get_color_from_thief(color_codes: number[], opacity: number = 1): string {
	// returns palette from color_thief in rgba format with opacity
	return `rgba(${color_codes.join(", ")}, ${opacity})`;
};
