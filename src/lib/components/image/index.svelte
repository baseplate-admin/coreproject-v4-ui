<script lang="ts">
	import { cn } from "$functions/classnames";
	import { onMount } from "svelte";
	import ImageWorker from "./image-worker?worker&inline";

	let {
		src,
		class: klass,
		color_palette = $bindable()
	}: {
		src: string;
		class?: string;
		color_palette: number[][];
	} = $props();

	let canvas_element = $state<HTMLCanvasElement>();
	let image_loaded = $state(false);

	let worker = $state<Worker>();

	onMount(() => {
		worker = new ImageWorker();
		worker.onmessage = (e) => {
			color_palette = e.data;
			image_loaded = true;
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

			let ctx = canvas_element.getContext("2d");

			canvas_element.width = img.width;
			canvas_element.height = img.height;

			// If you want to control the brightness, control this variable here.
			// if (ctx) ctx.filter = "brightness(25%)";

			ctx?.drawImage(img, 0, 0);

			let imageData = ctx?.getImageData(0, 0, canvas_element.width, canvas_element.height);

			if (imageData) {
				worker?.postMessage(imageData.data);
			}
		};
	});
</script>

<canvas bind:this={canvas_element} class={cn(klass)}></canvas>
