import lang from "$lib/translations/lang.json";

export type ILang = keyof typeof lang;
let state = $state<ILang>("en");

export function createLocaleStore() {
	return {
		get state() {
			return state;
		},
		set_locale(locale: ILang) {
			state = locale;
		}
	};
};
