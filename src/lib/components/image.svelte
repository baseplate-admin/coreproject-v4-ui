<script lang="ts">
	import { cn } from "$functions/classnames";
	import Star from "$icons/shapes/star.svelte";
	import init, { get_color_thief } from "../../../node_modules/color-thief-wasm-web";

	type Props = {
		src: string;
		class?: string;
		on_color_theif: (palette: string[][]) => void;
	};

	let {
		src,
		class: klass,
		on_color_theif
	}: Props = $props();

	let color_palette = $state<string[][]>();
	let canvas_element = $state<HTMLCanvasElement>();
	let image_loaded = $state(false);

	$effect(() => {
		if (image_loaded) return;

		let img = new Image();
		img.crossOrigin = "anonymous";
		img.src = src;
		img.onload = () => {
			init().then(() => {
				if (!canvas_element) return;
				let ctx = canvas_element.getContext("2d");

				canvas_element.width = img.width;
				canvas_element.height = img.height;

				// If you want to control the brightness, control this variable here.
				// if (ctx) ctx.filter = "brightness(25%)";

				ctx?.drawImage(img, 0, 0);

				let imageData = ctx?.getImageData(0, 0, canvas_element.width, canvas_element.height);

				if (imageData) {
					color_palette = get_color_thief(new Uint8Array(imageData.data), 64 * 64, 10, 5);
					on_color_theif(color_palette);
					image_loaded = true;
				}
			});
		};
	});
</script>

<canvas
	bind:this={canvas_element}
	class={cn(klass)}
></canvas>
