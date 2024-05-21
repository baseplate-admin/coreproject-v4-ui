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

			canvas_element.width = rect.width;
			canvas_element.height = rect.height;

			// If you want to control the brightness, control this variable here.
			// if (ctx) ctx.filter = "brightness(25%)";

			if (ctx) {
				const img_ratio = img.width / img.height;
				const canvas_ratio = rect.width / rect.height;
				let draw_width,
					draw_height,
					offset_x,
					offset_y;

				// check if iamge is wider or taller relative to canvas
				if (img_ratio > canvas_ratio) {
					draw_height = rect.height;
					draw_width = img_ratio * draw_height; // get width with relative to height
					offset_x = (rect.width - draw_width) / 2; // center iamge with remaining space
					offset_y = 0;
				} else {
					draw_width = rect.width;
					draw_height = draw_width / img_ratio;
					offset_x = 0;
					offset_y = (rect.height - draw_height) / 2;
				}

				ctx.drawImage(img, offset_x, offset_y, draw_width, draw_height);
			}

			let imageData = ctx?.getImageData(0, 0, rect.width, rect.height);

			if (imageData && worker) {
				worker.postMessage(imageData.data);
			}
		};
	});
</script>

<canvas bind:this={canvas_element} class={klass}></canvas>
