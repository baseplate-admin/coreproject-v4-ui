import { default_locale, locales, setLocale, setRoute, translations } from "$lib/translations";
import { browser } from "$app/environment";
export const load: Load = async ({ url }) => {
	const { pathname, searchParams } = url;
	let locale = "";

	if (searchParams && searchParams.has("lang")) {
		locale = (searchParams.get("lang") || "").toLowerCase();
	} else if (typeof localStorage !== "undefined" && localStorage.getItem("lang")) {
		locale = (localStorage.getItem("lang") || "").toLowerCase();
	}

	const supported_locales = locales.get().map((l) => l.toLowerCase());

	// use default locale if current locale is not supported
	if (browser) {
		if (!supported_locales.includes(locale)) {
			locale = navigator.language?.match(/[a-zA-Z]+?(?=-|_|,|;)/)?.[0].toLowerCase() || default_locale;
		}
		// save current locale on localStorage
		if (typeof localStorage !== "undefined") localStorage.setItem("lang", locale);
	}

	await setRoute(pathname);
	await setLocale(locale);

	return { pathname, locale };
};

// Vercel Shits. Remove when we do master production

import { dev } from "$app/environment";
import type { Load } from "@sveltejs/kit";

if (!dev) {
	const { injectSpeedInsights } = await import("@vercel/speed-insights/sveltekit");
	const { inject } = await import("@vercel/analytics");
	injectSpeedInsights();
	inject({ mode: "production" });
}
