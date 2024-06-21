import { COLOR_COUNT } from "$constants/image";
import { dedupe } from "$functions/array/dedupe";
import init, { get_color_thief } from "color-thief-wasm-web";
import chroma from "chroma-js";

onmessage = async function (event) {
	await init();

	const color_palette = get_color_thief(new Uint8Array(event.data), 64 * 64, 10, COLOR_COUNT),
		dominant_color = chroma(color_palette[0]).hex();

	postMessage({
		color_palette: dedupe(color_palette),
		dominant_color: dominant_color
	});
};
