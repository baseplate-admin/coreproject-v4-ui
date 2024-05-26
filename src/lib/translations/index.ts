import i18n, { type Config } from "sveltekit-i18n";
import { dev } from "$app/environment";
import lang from "./lang.json" assert { type: "json" };

export const default_locale: keyof typeof lang = "en";

export const config = {
	log: { level: dev ? "warn" : "error" },
	translations: {
		bn: { lang },
		en: { lang },
		es: { lang }
	},
	loaders: [
		{
			locale: "en",
			key: "home",
			routes: ["/anime"],
			loader: async () => (await import("./en/home.json")).default
		},
		{
			locale: "bn",
			key: "home",
			routes: ["/anime"],
			loader: async () => (await import("./bn/home.json")).default
		},
		{
			locale: "es",
			key: "home",
			routes: ["/anime"],
			loader: async () => (await import("./es/home.json")).default
		}
	]
} satisfies Config;

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);

// do something with this
// loading.subscribe(($loading) => console.log($loading));
