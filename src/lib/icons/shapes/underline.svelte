<script lang="ts">
	import type { SVGParams } from "$types/svg";

	let { class: klass, style, width, height }: SVGParams = $props();
</script>

<svg
	class={klass}
	{style}
	{width}
	{height}
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 52 52"
	enable-background="new 0 0 52 52"
	xml:space="preserve"
>
	<path
		d="M44.5,42h-37C6.7,42,6,42.7,6,43.5v3C6,47.3,6.7,48,7.5,48h37c0.8,0,1.5-0.7,1.5-1.5v-3
	C46,42.7,45.3,42,44.5,42z"
	/>
	<g>
		<path
			d="M25.3,38C17.8,37.6,12,31.1,12,23.6L12,10c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2l0,13.7c0,4.3,3.2,8,7.5,8.3
		c4.7,0.3,8.5-3.4,8.5-8V10c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2v14C40,32,33.3,38.4,25.3,38z"
		/>
	</g>
</svg>
