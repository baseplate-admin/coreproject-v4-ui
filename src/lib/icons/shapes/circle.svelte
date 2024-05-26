<script lang="ts">
	import type { SVGParams } from "$types/svg";

	let { class: klass, style, width, height }: SVGParams = $props();
</script>

<svg
	class={klass}
	{style}
	{width}
	{height}
	viewBox="0 0 10 10"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="5" cy="5" r="5" fill="currentColor" />
</svg>
