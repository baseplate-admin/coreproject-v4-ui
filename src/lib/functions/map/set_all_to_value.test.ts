import { set_all_to_value } from "$functions/map/set_all_to_value";
import { test, expect } from "vitest";

test("Set map value to true", () => {
	const myMap = new Map();

	myMap.set("banana", true);
	myMap.set("apple", true);

	set_all_to_value(myMap, false);

	expect(myMap.get("banana")).toBe(false);
	expect(myMap.get("apple")).toBe(false);
});
