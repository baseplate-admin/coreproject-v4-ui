import {
	loadTranslations,
	setLocale,
	setRoute
} from "$lib/translations";
import { dev } from "$app/environment";
import type { Load } from "@sveltejs/kit";
import { createLocaleStore } from "$stores/translations.svelte";

export const load: Load = async ({ url }) => {
	const locale_store = createLocaleStore();
	// Vercel Shits. Remove when we do master production

	if (!dev) {
		const { injectSpeedInsights } = await import("@vercel/speed-insights/sveltekit");
		const { inject } = await import("@vercel/analytics");
		injectSpeedInsights();
		inject({ mode: "production" });
	}

	const { pathname, searchParams } = url;

	if (searchParams && searchParams.has("lang")) {
		locale_store.set_locale((searchParams.get("lang") || "").toLowerCase())
	};

	console.log(locale_store.state);

	await setRoute(pathname);
	await setLocale(locale_store.state);
	// load translations before return
	await loadTranslations(locale_store.state, pathname);
	return { pathname, locale_store };
};
