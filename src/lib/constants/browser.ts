import { type Browser } from "detect-browser";
import { detect } from "detect-browser";

const browser = detect();

const MAPPING: { [key: string]: Browser[] } = {
	chromium: [
		"chrome",
		"chromium-webview",
		"android",
		// Yandex browser is chromium
		"yandexbrowser",
		// Edge is chrome too
		"edge-chromium",
		// Opera is chromium
		"opera"
	],
	firefox: ["firefox"]
};

// const IS_INTERNET_EXPLORER: boolean = _.includes([`ie`, `edge`], browser?.name.toLowerCase());

const browser_name: Browser = browser?.name.toLowerCase() as Browser;

export const IS_FIREFOX = MAPPING["firefox"].includes(browser_name);
export const IS_CHROMIUM = MAPPING["chromium"].includes(browser_name);
