// This test by nature is flaky

import { test, expect } from "vitest";
import { sample } from "$functions/array/sample";

test("array dedupe test", () => {
	const arr = [1, 2, 3];
	expect(arr).toContain(sample(arr));
});
