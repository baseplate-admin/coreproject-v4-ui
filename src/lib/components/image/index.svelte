<script lang="ts">
	import { onMount } from "svelte";
	import ImageWorker from "./image-worker?worker";
	import { color_mapping } from "./store.svelte";

	let {
		src,
		class: klass,
		color_palette = $bindable<number[][]>(),
		image_loaded = $bindable<boolean>()
	}: {
		src: string;
		class?: string;
		color_palette?: number[][];
		image_loaded?: boolean;
	} = $props();

	let canvas_element = $state<HTMLCanvasElement>();

	let worker = $state<Worker>();

	$effect.pre(() => {
		image_loaded = false;
		const map_value = color_mapping?.get(src);
		if (map_value) color_palette = map_value;
	});

	onMount(() => {
		if (color_palette) {
			image_loaded = true;
			return;
		}

		worker = new ImageWorker();
		worker.onmessage = (e) => {
			color_palette = e.data;
			image_loaded = true;

			// Set cache
			color_mapping?.set(src, color_palette);
			worker?.terminate();
		};
	});

	$effect(() => {
		if (image_loaded) return;

		let img = new Image();
		img.crossOrigin = "anonymous";
		img.src = src;
		img.onload = async () => {
			if (!canvas_element) return;

			const ctx = canvas_element.getContext("2d");
			const rect = canvas_element.getBoundingClientRect();

			console.log(canvas_element);

			canvas_element.width = rect.width;
			canvas_element.height = rect.height;

			// If you want to control the brightness, control this variable here.
			// if (ctx) ctx.filter = "brightness(25%)";

			if (ctx) {
				ctx.drawImage(img, 0, 0, rect.width, rect.height);
			}

			let imageData = ctx?.getImageData(0, 0, rect.width, rect.height);

			if (imageData && worker) {
				worker.postMessage(imageData.data);
			}
		};
	});
</script>

<canvas bind:this={canvas_element} class={klass}></canvas>
