<script lang="ts">
	import RLottieWasm from "./rlottie-worker";

	let { src }: {
		src: string;
	} = $props();

    let canvasEl = $state<HTMLCanvasElement>();

    class RLottieModule {
    	canvas: HTMLCanvasElement;
    	context: CanvasRenderingContext2D;
    	lottieHandle: any;
    	totalFrame: number;
    	curFrame: number;

		constructor() {
		    this.canvas = canvasEl as HTMLCanvasElement;
		    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		    this.lottieHandle = RLottieWasm;
		    this.totalFrame = this.lottieHandle.frames();
		    this.curFrame = 0;
		}

		render(speed: number) {
		    if(this.canvas.width == 0 || this.canvas.height == 0) return;
		    var buffer = this.lottieHandle.render(this.curFrame, this.canvas.width, this.canvas.height);
		    this.curFrame = Number(this.curFrame + speed);
		    var result = Uint8ClampedArray.from(buffer);
		    var imageData = new ImageData(result, this.canvas.width, this.canvas.height);
		    this.context.putImageData(imageData, 0, 0);
		}
	}

	const rm = new RLottieModule();

	$effect(() => {
		rm.lottieHandle.load(src);
		rm.totalFrame = rm.lottieHandle.frames();
		rm.curFrame = 0;

		rm.render(1);
	});
</script>

<canvas bind:this={canvasEl}></canvas>
