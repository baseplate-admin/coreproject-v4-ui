import init, { get_color_thief } from "color-thief-wasm-web";
import wasm from "color-thief-wasm-web/color_thief_wasm_bg.wasm?url";

onmessage = async function (event) {
	await init(wasm);
	let color_palette: number[][] = get_color_thief(new Uint8Array(event.data), 64 * 64, 10, 5);
	postMessage(color_palette);
};
