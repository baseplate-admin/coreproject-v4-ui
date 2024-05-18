import { locales, loadTranslations, translations, defaultLocale } from "$lib/translations";
import type { ServerLoad } from "@sveltejs/kit";
import type { Translations } from "../../node_modules/sveltekit-i18n/node_modules/@sveltekit-i18n/base";

export const load: ServerLoad = async ({ url, cookies, request }): Promise<{
	i18n: { locale: string, route: string },
	translations: Translations.SerializedTranslations;
}> => {
	const { pathname } = url;

	// try to get the locale from cookie
	let locale = (cookies.get("lang") || "").toLowerCase();
	// get user preferred locale
	if (!locale) {
	    locale = `${`${request.headers.get("accept-language")}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
	};
	// get defined locales
  	const supportedLocales = locales.get().map((l) => l.toLowerCase());
  	
  	// use default locale if current locale is not supported
	if (!supportedLocales.includes(locale)) {
	    locale = defaultLocale;
	};

	await loadTranslations(locale, pathname);

	return {
		i18n: { locale, route: pathname },
		translations: translations.get(),
	};
};
