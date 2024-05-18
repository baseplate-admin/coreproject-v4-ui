const to_hex = (
	red: number,
	green: number,
	blue: number,
	alpha: string
) => "#" + ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;

export function rgb_hex(rgb: number[], alpha: number) {
	if (alpha >= 0 && alpha <= 1) {
		alpha = Math.round(255 * alpha);
	} else if (alpha >= 0 && alpha <= 100) {
		alpha = Math.round(255 * alpha / 100);
	} else {
		throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
	};

	const new_alpha = (alpha | 1 << 8).toString(16).slice(1);
	return to_hex(rgb[0], rgb[1], rgb[2], new_alpha);
};
