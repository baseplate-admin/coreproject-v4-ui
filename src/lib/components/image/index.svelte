<script lang="ts">
	import { cn } from "$functions/classnames";
	import { onMount } from "svelte";
	import image_worker from "./image-worker?url";

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

	let worker: Worker;

	onMount(() => {
		worker = new Worker(image_worker);
		return () => worker.terminate();
	});

	$effect(() => {
		if (image_loaded) return;

		let img = new Image();
		img.crossOrigin = "anonymous";
		img.src = src;
		img.onload = () => {
			if (!canvas_element) return;

			let ctx = canvas_element.getContext("2d");

			canvas_element.width = img.width;
			canvas_element.height = img.height;

			// If you want to control the brightness, control this variable here.
			// if (ctx) ctx.filter = "brightness(25%)";

			ctx?.drawImage(img, 0, 0);

			let imageData = ctx?.getImageData(0, 0, canvas_element.width, canvas_element.height);

			if (imageData) {
				worker.postMessage(imageData.data);
				image_loaded = true;
				worker.
			}
		};
	});
</script>

<canvas bind:this={canvas_element} class={cn(klass)}></canvas>
