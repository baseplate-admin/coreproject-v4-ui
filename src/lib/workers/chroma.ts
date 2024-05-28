import chroma from "chroma-js";

onmessage = async function (event) {
	console.log(event.data);
	const c = chroma([255,255,255]);
	postMessage({
		color: c,
		index: event.data.index
	});
};
