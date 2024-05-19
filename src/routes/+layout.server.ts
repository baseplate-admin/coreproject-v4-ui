import { locales, loadTranslations, translations, default_locale } from "$lib/translations";
import lang from  "$lib/translations/lang.json"
import type { ServerLoad } from "@sveltejs/kit";
import type { Translations } from "../../node_modules/sveltekit-i18n/node_modules/@sveltekit-i18n/base";

export const load: ServerLoad = async ({ url, cookies, request, params }): Promise<{
	i18n: { locale: string, route: string },
	translations: Translations.SerializedTranslations;
}> => {
	const { pathname } = url;
	let locale: string;

	if (params.lang) {
		locale = params.lang;
	} else if (cookies.get("lang")) {
		locale = (cookies.get("lang") || "").toLowerCase();
	} else {
		locale = `${`${request.headers.get("accept-language")}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
	};

	// // get defined locales
  	const supported_locales = locales.get().map((l) => l.toLowerCase());

  	// use default locale if current locale is not supported
	if (!supported_locales.includes(locale)) {
	    locale = default_locale;
	};

	// remove locale from pathname to load translations properly
	const route = pathname.replace(new RegExp(`^/${locale}`), "");
	// pass locale instead default_locale after feature complete
	await loadTranslations(locale, route);

	return {
		i18n: { locale, route },
		translations: translations.get(),
	};
};
