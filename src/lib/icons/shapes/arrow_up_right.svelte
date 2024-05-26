<script lang="ts">
	import type { SVGParams } from "$types/svg";

	let { class: klass, style, width, height }: SVGParams = $props();
</script>

<svg
	class={klass}
	{style}
	{width}
	{height}
	viewBox="0 0 16 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M4.66699 11.3333L11.3337 4.66666"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path
		d="M4.66699 4.66666H11.3337V11.3333"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
