<script lang="ts">
	import { cn } from "$functions/classnames";
	import init, { get_color_thief } from "color-thief-wasm-web";

	// Exports
	let {
		src,
		dominant_color,
		class: klass
	}: { src: string } & Partial<{ dominant_color: string; class: string }> = $props();

	let canvas_element = $state<HTMLCanvasElement>();
	let image_loaded = $state<boolean>(false);

	$effect(() => {
		let img = document.createElement("img");
		img.crossOrigin = "anonymous";
		img.onload = () => {
			init().then(() => {
				if (!canvas_element) return;
				let ctx = canvas_element?.getContext("2d");

				canvas_element.width = img.width;
				canvas_element.height = img.height;

				// If you want to control the brightness, control this variable here.
				// if (ctx) ctx.filter = "brightness(25%)";

				ctx?.drawImage(img, 0, 0);

				let imageData = ctx?.getImageData(0, 0, canvas_element.width, canvas_element.height);

				if (imageData) {
					const colors = get_color_thief(new Uint8Array(imageData.data), 64 * 64, 10, 5);
					dominant_color = `rgba(${colors[0][0]},${colors[0][1]},${colors[0][2]}, 0.15)`;
					image_loaded = true;
				}
			});
		};

		img.src = src;
	});
</script>

<canvas bind:this={canvas_element} class={cn(klass)}> </canvas>
