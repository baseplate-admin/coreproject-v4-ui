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
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M8 8L3 12L8 16M16 16L21 12L16 8"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
