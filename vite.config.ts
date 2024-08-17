import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	optimizeDeps: {
		exclude: ["color-thief-wasm-web"]
	},
	esbuild: {
		target: "esnext",
		legalComments: "external"
	},
	css: {
		devSourcemap: true,
		// Switch to lightning.css when tailwind supports it
		transformer: "postcss"
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true
		},
		chunkSizeWarningLimit: 2048,
		emptyOutDir: true,
		target: "esnext",
		cssTarget: "esnext",
		minify: "terser"
		//sourcemap: true
	},
	worker: {
		format: "es"
	},

	plugins: [
		sveltekit(),
		visualizer({
			emitFile: true,
			filename: "stats.html"
		})
	],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"]
	}
});
