<script lang="ts">
	import type { SVGParams } from "$types/svg";

	let { class: klass, style, width, height }: SVGParams = $props();
</script>

<svg
	class={klass}
	{style}
	{width}
	{height}
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M4.16675 2.5L15.8334 10L4.16675 17.5V2.5Z"
		stroke="#070519"
		stroke-width="3"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
