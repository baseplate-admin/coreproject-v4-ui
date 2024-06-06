<script lang="ts">
	import RLottieWasm from "./rlottie-worker";

	let { src, speed }: {
		src: string;
		speed: number;
	} = $props();

    let canvasEl = $state<HTMLCanvasElement>();
    let context = $derived(canvasEl?.getContext("2d"));
    let lottieHandle: any = $state(RLottieWasm);
    let totalFrame = $state(lottieHandle.frames());
    let curFrame = $state(0);

	function render(speed: number) {
		if (canvasEl?.width == 0 || canvasEl?.height == 0) return;
	    var buffer = lottieHandle.render(curFrame, canvasEl?.width, canvasEl?.height);
	    curFrame = Number(curFrame + speed);
	    var result = Uint8ClampedArray.from(buffer);
	    var imageData = new ImageData(result, canvasEl!.width, canvasEl!.height);
	    context?.putImageData(imageData, 0, 0);
	};

	$effect(() => {
		lottieHandle.load(src);
		totalFrame = lottieHandle.frames();
		curFrame = 0;

		render(1);
	});
</script>

<canvas bind:this={canvasEl}></canvas>
