import i18n, { type Config } from "sveltekit-i18n";
import { dev } from "$app/environment";
import lang from "./lang.json" assert { type: "json" };

const route_table = {
  anime: "/anime"
};

export const translations_locales = ["en", "bn", "es", "dn"];

export const default_locale: keyof typeof lang = "en";

export const config = {
  log: { level: dev ? "warn" : "error" },
  translations: translations_locales.reduce((acc, locale) => ({ ...acc, [locale]: { lang } }), {}),
  loaders: [
    // EN
    {
      locale: "en",
      key: "common",
      loader: async () => (await import("./en/common.json")).default
    },
    {
      locale: "en",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./en/anime/home.json")).default
    },
    // BN
    {
      locale: "bn",
      key: "common",
      loader: async () => (await import("./bn/common.json")).default
    },
    {
      locale: "bn",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./bn/anime/home.json")).default
    },
    // ES
    {
      locale: "es",
      key: "common",
      loader: async () => (await import("./es/common.json")).default
    },
    {
      locale: "es",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./es/anime/home.json")).default
    },
    // DE
    {
      locale: "de",
      key: "common",
      loader: async () => (await import("./de/common.json")).default
    },
    {
      locale: "de",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./de/anime/home.json")).default
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
