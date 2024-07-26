import { url_matches_with_pathname } from "$functions/urls/url_matches_with_pathname";
import { test, expect } from "vitest";

test("remove trailing slash", () => {
	expect(url_matches_with_pathname({ url: "/anime", pathname: "/hello/anime" })).toBe(true);
	expect(
		url_matches_with_pathname({
			url: "/anime",
			pathname: new URL("https://localhost/anime").pathname
		})
	).toBe(true);

	expect(url_matches_with_pathname({ url: "/anime", pathname: "/hello" })).toBe(false);
});
