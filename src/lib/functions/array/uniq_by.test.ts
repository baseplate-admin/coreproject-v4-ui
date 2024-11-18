import { expect, test } from "vitest";
import { uniq_by } from "$functions/array/uniq_by";

test("uniq by", () => {
	expect(
		uniq_by(
			[
				{ id: 1, name: "Kokoro" },
				{ id: 2, name: "Titan" },
				{ id: 1, name: "Sheldon" }
			],
			"id"
		)
	).toEqual([
		{ id: 1, name: "Kokoro" },
		{ id: 2, name: "Titan" }
	]);
});
