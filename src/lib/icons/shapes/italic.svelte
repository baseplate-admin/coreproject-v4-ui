<script lang="ts">
	import type { SVGParams } from "$types/svg";

	let { class: klass, style, width, height }: SVGParams = $props();
</script>

<svg
	class={klass}
	{style}
	{width}
	{height}
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	fill="currentColor"
>
	<path
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M10 6h4m4 0h-4m0 0-4 12m0 0h4m-4 0H6"
	/>
</svg>
