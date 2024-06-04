import { browser } from "$app/environment";
import { default_locale, locales } from "$lib/translations";
import lang from "$lib/translations/lang.json";

type ILang = keyof typeof lang;
let state = $state<ILang>(default_locale);
const supported_locales = locales.get().map((l) => l.toLowerCase());

if (browser) {
	if (localStorage.getItem("lang")) {
		state = (localStorage.getItem("lang") || "").toLowerCase() as ILang;
	} else {
		localStorage.setItem("lang", state);
	}
}

export function createLocaleStore() {
	return {
		get state() {
			return state;
		},
		set_locale(locale: string) {
			if (supported_locales.includes(locale)) {
				state = locale as ILang;
			}
			if (browser) {
				if (!supported_locales.includes(state)) {
					state = ((navigator.language?.match(/[a-zA-Z]+?(?=-|_|,|;)/)?.[0].toLowerCase() ?? default_locale) as ILang);
				}
				// save locale to localstorage
				if (state !== localStorage.getItem("lang")) {
					localStorage.setItem("lang", state);
				}
			}
		}
	};
};
