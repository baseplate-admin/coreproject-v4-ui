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
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./bn/home.json")).default
    },
    // ES
    {
      locale: "es",
      key: "home",
      routes: [route_table["anime"]],
      loader: async () => (await import("./es/home.json")).default
    },
    // DE
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

// do something with this
// loading.subscribe(($loading) => console.log($loading));
