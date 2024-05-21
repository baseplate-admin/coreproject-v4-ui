import { addTranslations, setLocale, setRoute } from "$lib/translations";
import type { Translations } from "../../node_modules/sveltekit-i18n/node_modules/@sveltekit-i18n/base";

interface Data {
	i18n: { locale: string; route: string };
	translations: Translations.SerializedTranslations;
}

export const load = async ({ data }: { data: Data }) => {
	const { i18n, translations } = data;
	const { locale, route } = i18n;

	addTranslations(translations);

	await setRoute(route);
	await setLocale(locale);

	return i18n;
};

// Vercel Shits. Remove when we do master production

import { dev } from "$app/environment";

if (!dev) {
	const { injectSpeedInsights } = await import("@vercel/speed-insights/sveltekit");
	const { inject } = await import("@vercel/analytics");
	injectSpeedInsights();
	inject({ mode: dev ? "development" : "production" });
}
