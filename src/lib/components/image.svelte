<script lang="ts">
	import { cn } from "$functions/classnames";
	import init, { get_color_thief } from "../../../node_modules/color-thief-wasm-web";

	let {
		src,
		class: klass,
		color_palette = $bindable()
	}: {
		src: string;
		class?: string;
		color_palette: string[];
	} = $props();

	let canvas_element = $state<HTMLCanvasElement>();
	let image_loaded = $state(false);

	function rgb_to_hex(r: number, g: number, b: number) {
	    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	};

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
					const colors_arr: [number, number, number][] = get_color_thief(new Uint8Array(imageData.data), 64 * 64, 10, 5);
					color_palette = colors_arr.map((color_codes) => rgb_to_hex(...color_codes));
					image_loaded = true;
				}
			});
		};
	});
</script>

<canvas bind:this={canvas_element} class={cn(klass)}></canvas>
