import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { visualizer } from "rollup-plugin-visualizer";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	plugins: [nodePolyfills(), sveltekit(), visualizer()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"]
	}
});
