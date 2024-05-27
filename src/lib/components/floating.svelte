<script lang="ts">
	import type { Snippet } from "svelte";

	import {
		useFloating,
		offset,
		flip,
		autoUpdate,
		useRole,
		useHover,
		useInteractions
	} from "@skeletonlabs/floating-ui-svelte";
	import { portal } from "svelte-portal";
	import { blur, fade, fly } from "svelte/transition";

	let { floating, children }: {
		floating: Snippet;
		children: Snippet;
	} = $props();

	let open = $state(false);

	const floating_options = useFloating({
		whileElementsMounted: autoUpdate,
		get open() {
			return open;
		},
		onOpenChange: (v) => (open = v),
		placement: 'left',
		get middleware() {
			return [offset(15), flip()];
		},
	})

	const role = useRole(floating_options.context, { role: "tooltip" });
	const hover = useHover(floating_options.context)
	const intersections = useInteractions([role, hover]);
</script>

<div
	bind:this={floating_options.elements.reference}
	{...intersections.getReferenceProps()}
>
	{@render children()}
</div>

{#if open}
	<div
		use:portal={"body"}
		bind:this={floating_options.elements.floating}
		{...intersections.getFloatingProps()}
		style={floating_options.floatingStyles}
		transition:blur={{ duration: 300 }}
	>
		{@render floating()}
	</div>
{/if}
