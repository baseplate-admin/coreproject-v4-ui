import init, { get_color_thief } from "color-thief-wasm-web";
import wasm from "color-thief-wasm-web/color_thief_wasm_bg.wasm?url";

const COLOR_COUNT = 255; // Our theoritical limit is 256  = (0+255) colors

onmessage = async function (event) {
	await init(wasm);
	let color_palette: number[][] = get_color_thief(
		new Uint8Array(event.data),
		64 * 64,
		10,
		COLOR_COUNT
	);
	postMessage(color_palette);
};
