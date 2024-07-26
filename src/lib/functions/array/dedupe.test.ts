import { test, expect } from "vitest";
import { dedupe } from "$functions/array/dedupe";

test("array dedupe test", () => {
	expect(dedupe([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3])).toStrictEqual([1, 2, 3]);
});
