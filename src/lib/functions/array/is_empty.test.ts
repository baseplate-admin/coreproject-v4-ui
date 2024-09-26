import { expect, test } from "vitest";
import { is_empty } from "$functions/array/is_empty";

test("check is empty", () => {
  expect(is_empty(undefined)).toBe(true)
  expect(is_empty([])).toBe(true)
  expect(is_empty("hello")).toBe(false)
})
