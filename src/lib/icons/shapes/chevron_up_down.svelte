<script lang="ts">
	import type { SVGParams } from "$types/svg";

	let { class: klass, style, width, height }: SVGParams = $props();
</script>

<svg
	class={klass}
	{style}
	{width}
	{height}
	viewBox="0 0 18 18"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M5.3999 11.25L9.1499 15L12.8999 11.25"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M12.8999 6.75L9.1499 3L5.3999 6.75"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
