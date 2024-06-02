<script lang="ts">
	import { cn } from "$functions/classnames";
	import ScrollArea from "$components/scroll_area.svelte";
	import type { Snippet } from "svelte";

	let {
		children,
		class: klass,
		height = "",
		duration = "duration-300",
		line_clamp = "line-clamp-1"
	}: { children: Snippet } & Partial<{
		class: string;
		height: string;
		duration: string;
		line_clamp: string;
	}> = $props();
</script>

<ScrollArea
	class={cn(
		klass,
		height,
		duration,
		"overflow-hidden ease-in-out scrollbar-none hover:overflow-y-scroll"
	)}
>
	<span
		class={cn(
			line_clamp,
			"md:line-clamp-none [&:not(:hover)]:[mask-image:_linear-gradient(90deg,_rgba(7,5,25)_75%,_rgba(0,0,0,0)_100%)]"
		)}
	>
		{@render children()}
	</span>
</ScrollArea>
