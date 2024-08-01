import i18n, { type Config } from "sveltekit-i18n";
import { dev } from "$app/environment";
import lang from "./lang.json" assert { type: "json" };

const route_table = {
  anime: /^\/anime\/?.*$/
};

export const default_locale: keyof typeof lang = "en";

export const config = {
  log: { level: dev ? "warn" : "error" },
  translations: {
    bn: { lang },
    en: { lang },
    es: { lang },
    de: { lang }
  },
  loaders: [
    {
      locale: "en",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./en/home.json")).default
    },
    {
      locale: "bn",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./bn/home.json")).default
    },
    {
      locale: "es",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./es/home.json")).default
    },
    {
      locale: "de",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./de/home.json")).default
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
