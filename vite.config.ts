import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	optimizeDeps: {
		exclude: ["color-thief-wasm-web"]
	},
	esbuild: {
		// target: "esnext"
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
		cssTarget: "es2015",
		minify: "terser"
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
