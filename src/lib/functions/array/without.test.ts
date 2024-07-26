import { test, expect } from "vitest";
import { without } from "$functions/array/without";

test("array dedupe test", () => {
	expect(without([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3], 3)).toStrictEqual([1, 1, 1, 1, 2, 2, 2, 2]);
});
