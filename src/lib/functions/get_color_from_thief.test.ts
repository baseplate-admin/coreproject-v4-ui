import { get_color_from_thief } from "./get_color_from_thief";
import { expect, test } from "vitest";

test("get color from color_thief palette", () => {
	const test_palette = [[220,96,108],[67,19,23]];
	expect(get_color_from_thief(test_palette[0], 0.25)).toBe("rgba(220, 96, 108, 0.25)");
	expect(get_color_from_thief(test_palette[1])).toBe("rgba(67, 19, 23, 1)");
});