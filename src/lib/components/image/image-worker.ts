import init, { get_color_thief } from "color-thief-wasm-web";

onmessage = async function (event) {
	await init();
	console.log("Hello");
	let color_palette: number[][] = get_color_thief(new Uint8Array(event.data), 64 * 64, 10, 5);
	console.log(color_palette);
	postMessage(color_palette);
};
