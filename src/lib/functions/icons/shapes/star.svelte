<script lang="ts">
	import type { SVGParams } from "$types/svg";

	interface StarSVGParams extends SVGParams {
		variant: "full" | "half" | "empty";
		fill_color: string;
	}

	let {
		class: klass,
		style,
		width = 30,
		height = 30,
		variant,
		fill_color
	}: StarSVGParams = $props();
</script>

{#if variant === "empty"}
	<svg
		class={klass}
		{style}
		{width}
		{height}
		viewBox="0 0 30 30"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15 2.5L18.8625 10.325L27.5 11.5875L21.25 17.675L22.725 26.275L15 22.2125L7.275 26.275L8.75 17.675L2.5 11.5875L11.1375 10.325L15 2.5Z"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{:else if variant === "half"}
	<svg
		class={klass}
		{style}
		{width}
		{height}
		viewBox="0 0 30 30"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient id="grad">
				<stop offset="50%" stop-color={fill_color} />
				<stop offset="50%" stop-color="transparent" />
			</linearGradient>
		</defs>
		<path
			fill="url(#grad)"
			d="M15 2.5L18.8625 10.325L27.5 11.5875L21.25 17.675L22.725 26.275L15 22.2125L7.275 26.275L8.75 17.675L2.5 11.5875L11.1375 10.325L15 2.5Z"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{:else if variant === "full"}
	<svg
		class={klass}
		{style}
		{width}
		{height}
		viewBox="0 0 30 30"
		fill={fill_color}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15 2.5L18.8625 10.325L27.5 11.5875L21.25 17.675L22.725 26.275L15 22.2125L7.275 26.275L8.75 17.675L2.5 11.5875L11.1375 10.325L15 2.5Z"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{/if}
