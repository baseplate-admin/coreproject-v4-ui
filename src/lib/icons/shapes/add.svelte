<script lang="ts">
	import type { SVGParams } from "$types/svg";

	let { class: klass, style, width, height }: SVGParams = $props();
</script>

<svg class={klass} {style} {width} {height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
	<path
		fill="currentColor"
		d="M6.5 1.75a.75.75 0 0 0-1.5 0V5H1.75a.75.75 0 0 0 0 1.5H5v3.25a.75.75 0 0 0 1.5 0V6.5h3.25a.75.75 0 0 0 0-1.5H6.5V1.75Z"
	/>
</svg>
