import {
	default_locale,
	loadTranslations,
	locales,
	setLocale,
	setRoute,
	translations
} from "$lib/translations";
import { browser } from "$app/environment";
import { dev } from "$app/environment";
import type { Load } from "@sveltejs/kit";
import { createLocaleStore, type ILang } from "$stores/translations.svelte";

export const load: Load = async ({ url }) => {
	const locale_store = createLocaleStore();
	console.log(locale_store.state);
	// Vercel Shits. Remove when we do master production

	if (!dev) {
		const { injectSpeedInsights } = await import("@vercel/speed-insights/sveltekit");
		const { inject } = await import("@vercel/analytics");
		injectSpeedInsights();
		inject({ mode: "production" });
	}

	const { pathname, searchParams } = url;

	if (searchParams && searchParams.has("lang")) {
		locale_store.set_locale((searchParams.get("lang") || "").toLowerCase() as ILang)
	} else if (typeof localStorage !== "undefined" && localStorage.getItem("lang")) {
		locale_store.set_locale((localStorage.getItem("lang") || "").toLowerCase() as ILang);
	}

	const supported_locales = locales.get().map((l) => l.toLowerCase());

	// use default locale if current locale is not supported
	if (browser) {
		if (!supported_locales.includes(locale_store.state)) {
			locale_store.set_locale((navigator.language?.match(/[a-zA-Z]+?(?=-|_|,|;)/)?.[0].toLowerCase() ?? default_locale) as ILang);
		}
		// save current locale on localStorage
		if (locale_store.state !== localStorage.getItem("lang")) {
			localStorage.setItem("lang", locale_store.state);
		}
	}

	await setRoute(pathname);
	await setLocale(locale_store.state);
	// load translations before return
	await loadTranslations(locale_store.state, pathname);
	return { pathname, locale_store };
};
