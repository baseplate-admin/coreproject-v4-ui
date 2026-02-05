<script lang="ts">
	import { onMount } from "svelte";
	import RLottieWasm from "./rlottie-worker";

	let { src, speed }: {
		src: string;
		speed: number;
	} = $props();

    let canvasEl = $state<HTMLCanvasElement>();
    let context = $state<CanvasRenderingContext2D>();
    let lottieHandle: any = $state(RLottieWasm);
    let totalFrame = $state<number>();
    let curFrame = $state(0);

    onMount(() => {
		context = canvasEl?.getContext("2d") as CanvasRenderingContext2D;
		totalFrame = lottieHandle.frames();
	});

	$effect(() => {
		lottieHandle.load(src);
		totalFrame = lottieHandle.frames();
		curFrame = 0;

		render();
	});

	function render() {
		if (canvasEl?.width == 0 || canvasEl?.height == 0) return;
	    var buffer = lottieHandle.render(curFrame, canvasEl?.width, canvasEl?.height);
	    curFrame = Number(curFrame + speed);
	    var result = Uint8ClampedArray.from(buffer);
	    var imageData = new ImageData(result, canvasEl!.width, canvasEl!.height);
	    context?.putImageData(imageData, 0, 0);
	};
</script>

<canvas bind:this={canvasEl}></canvas>
