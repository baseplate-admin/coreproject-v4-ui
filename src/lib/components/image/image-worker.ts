import init, { get_color_thief } from "color-thief-wasm-web";

const COLOR_COUNT = 255; // Our theoritical limit is 256  = (0+255) colors

onmessage = async function (event) {
	await init();
	let color_palette: number[][] = get_color_thief(
		new Uint8Array(event.data),
		64 * 64,
		10,
		COLOR_COUNT
	);
	postMessage(color_palette);
};
