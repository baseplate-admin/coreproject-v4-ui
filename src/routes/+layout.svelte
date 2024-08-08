<script lang="ts">
	import { createAdblockerStore } from "$stores/adblocker.svelte";
	import { onMount } from "svelte";
	import "../styles/index.postcss";

	const adblocker_store = createAdblockerStore();

	onMount(async () => {
		// @ts-expect-error
		await import("@coreproject-moe/icons");
	});

	// Stolen from : https://github.com/fivefilters/block-ads/blob/2d47fa1c7341cbf897710574972cdcf9cefa390d/index.html#L183
	const SENSITIVE_ADVERSIEMENT_URL =
		"https://widgets.outbrain.com/images/widgetIcons/ob_logo_16x16.png?advertiser=1";

	const { children } = $props();
</script>

<div class="bg-secondary">
	{@render children()}
</div>

<div class="invisible">
	<img
		src={SENSITIVE_ADVERSIEMENT_URL}
		alt="advertisement"
		onload={() => {
			adblocker_store.state = false;
		}}
		onerror={() => {
			adblocker_store.state = true;
		}}
	/>
</div>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss" global>
	@font-face {
		font-family: "Kokoro";
		src: url("../fonts/Kokoro/Kokoro-SemiBoldItalic.woff2") format("woff2");
		font-weight: 600;
		font-style: italic;
		font-display: swap;
	}
	@font-face {
		font-family: "Kokoro";
		src: url("../fonts/Kokoro/Kokoro-SemiBold.woff2") format("woff2");
		font-weight: 600;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: "Kokoro";
		src: url("../fonts/Kokoro/Kokoro-BoldItalic.woff2") format("woff2");
		font-weight: bold;
		font-style: italic;
		font-display: swap;
	}
	@font-face {
		font-family: "Kokoro";
		src: url("../fonts/Kokoro/Kokoro-Italic.woff2") format("woff2");
		font-weight: normal;
		font-style: italic;
		font-display: swap;
	}
	@font-face {
		font-family: "Kokoro";
		src: url("../fonts/Kokoro/Kokoro-Regular.woff2") format("woff2");
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: "Kokoro";
		src: url("../fonts/Kokoro/Kokoro-Bold.woff2") format("woff2");
		font-weight: bold;
		font-style: normal;
		font-display: swap;
	}

	$nprogress-bar-color: oklch(var(--in));
	$nprogress-bar-warning-color: oklch(var(--wa));

	$animation-duration: 2s;
	$nprogress-height: 0.2rem;

	/* Make clicks pass-through */
	#nprogress {
		pointer-events: none;
	}

	#nprogress .bar {
		background: $nprogress-bar-color;
		animation: change-bg $animation-duration linear infinite;

		position: fixed;
		z-index: 1031;
		top: 0;
		left: 0;

		width: 100%;
		height: $nprogress-height;

		@keyframes change-bg {
			0%,
			100% {
				background: $nprogress-bar-color;
			}
			50% {
				background: $nprogress-bar-warning-color;
			}
		}
	}

	/* Fancy blur effect */
	#nprogress .peg {
		display: block;
		position: absolute;
		right: 0px;
		width: 100px;
		height: 100%;
		box-shadow:
			0 0 10px $nprogress-bar-color,
			0 0 5px $nprogress-bar-color;
		opacity: 1;

		-webkit-transform: rotate(3deg) translate(0px, -4px);
		-ms-transform: rotate(3deg) translate(0px, -4px);
		transform: rotate(3deg) translate(0px, -4px);
	}
</style>
