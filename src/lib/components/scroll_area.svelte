<script lang="ts">
	import { IS_CHROMIUM, IS_FIREFOX } from "$constants/browser";
	import { cn } from "$functions/classnames";
	import type { Snippet } from "svelte";

	let {
		children,
		class: klass,
		offset_scrollbar = false,
		remove_gradient_on_mouse_enter = false,
		parent_class = "",
		gradient_mask = false
	}: Partial<{
		children: Snippet;
		class: string;
		remove_gradient_on_mouse_enter: boolean;
		parent_class: string;
		offset_scrollbar: boolean;
		gradient_mask: boolean;
	}> = $props();

	let scroll_area = $state<HTMLElement>();
	let add_mask_bottom = $state<boolean>(true);

	$effect(() => {
		add_mask_bottom = scroll_area ? scroll_area?.scrollHeight > scroll_area.clientHeight : false;
	});

	$effect(() => {});

	const handle_scroll = async (event: Event) => {
			if (remove_gradient_on_mouse_enter) return;

			const target = event.target as HTMLElement;
			const { scrollHeight, clientHeight, scrollTop } = target;
			add_mask_bottom = clientHeight + scrollTop !== scrollHeight;
		},
		handle_mouseenter = () => {
			if (remove_gradient_on_mouse_enter) {
				add_mask_bottom = false;
			}
		},
		handle_mouseleave = () => {
			if (remove_gradient_on_mouse_enter) {
				add_mask_bottom = true;
			}
		};
</script>

<div
	role="contentinfo"
	bind:this={scroll_area}
	onscroll={handle_scroll}
	onmouseenter={handle_mouseenter}
	onmouseleave={handle_mouseleave}
	class={cn(
		parent_class,
		offset_scrollbar &&
			// Chromium support for scrollbar sucks
			!IS_CHROMIUM &&
			"pr-3 md:pr-[0.75vw]",

		"flex h-full w-full overflow-y-scroll overscroll-y-contain [scrollbar-color:rgba(255,255,255,0.12)transparent]"
	)}
	class:scrollbar-none={IS_CHROMIUM}
	class:scrollbar-thin={IS_FIREFOX}
	class:[mask-image:linear-gradient(180deg,rgba(7,5,25,0.95)80%,rgba(0,0,0,0)100%)]={gradient_mask &&
		add_mask_bottom}
>
	<div class={cn(klass)}>
		{@render children?.()}
	</div>
</div>
