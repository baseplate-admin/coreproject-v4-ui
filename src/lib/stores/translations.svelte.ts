import { browser } from "$app/environment";
import { default_locale, locales } from "$lib/translations";
import lang from "$lib/translations/lang.json";

type ILang = keyof typeof lang;

const supported_locales = locales.get().map((l) => l.toLowerCase());

let state = $state<ILang>(detect_language() satisfies ILang);

function detect_language() {
	if (!browser) return default_locale;

	const localstorage_value = localStorage.getItem("lang");
	if (localstorage_value) return localstorage_value as ILang;

	const browser_lang = navigator.language.split("-")[0];
	if (browser_lang) return browser_lang as ILang;

	return default_locale;
}

export function createLocaleStore() {
	return {
		get state() {
			return state;
		},
		set_locale(locale: string) {
			if (supported_locales.includes(locale)) {
				state = locale as ILang;
				localStorage.setItem("lang", state);
			} else {
				throw new Error(`${locale} is not part of ${supported_locales}`);
			}
		}
	};
}
