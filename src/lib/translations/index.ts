import i18n, { type Config } from "sveltekit-i18n";
import { dev } from "$app/environment";
import lang from "./lang.json";

export const default_locale = "en";

export const config = {
	log: {
		level: dev ? "warn" : "error",
	},
	translations: {
		en: { lang },
		jp: { lang },
	},
	loaders: [
		{
			locale: "en",
			key: "home",
			routes: ["/anime"],
			loader: async () => (await import("./en/home.json")).default
		},
	]
} satisfies Config;

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
