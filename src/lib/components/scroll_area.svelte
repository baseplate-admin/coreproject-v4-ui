<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { IS_CHROMIUM, IS_FIREFOX } from '$constants/browser';
	import { cn } from '$functions/classnames';
	import type { Snippet } from 'svelte';

	let {
		children,
		class: klass,
		offset_scrollbar = false,
		remove_gradient_on_mouse_enter = false,
		parent_class = '',
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
	let add_mask_bottom = $state<boolean>(),
		expanded = false;

	let first_element_intersecting = $state<boolean>(),
		end_element_intersecting = $state<boolean>(),
		first_element = $state<HTMLElement>(),
		end_element = $state<HTMLElement>();

	$effect(() => {
		add_mask_bottom = scroll_area ? scroll_area?.scrollHeight > scroll_area.clientHeight : false;
	});
	const handle_scroll = async (event: Event) => {
			const target = event.target as HTMLElement;
			const { scrollHeight, clientHeight, scrollTop } = target;
			add_mask_bottom = clientHeight + scrollTop === scrollHeight ? false : true;
		},
		handle_mouseenter = () => {
			expanded = true;

			if (remove_gradient_on_mouse_enter) {
				add_mask_bottom = false;
			} else {
				scroll_area?.addEventListener('transitionend', () => {
					if (first_element_intersecting && end_element_intersecting) {
						add_mask_bottom = false;
					}
				});
			}
		},
		handle_mouseleave = () => {
			if (!expanded) {
				if (remove_gradient_on_mouse_enter) {
					scroll_area?.addEventListener('transitionend', () => {
						add_mask_bottom = true;
					});
				} else {
					scroll_area?.addEventListener('transitionend', () => {
						if (first_element_intersecting && end_element_intersecting) {
							add_mask_bottom = true;
						}
					});
				}
				expanded = false;
			}
		};
	// TODO: Do AOT ( Ahead of Time ) calculations on `transitionrun` to  prevent flicker
</script>

<div
	role="contentinfo"
	bind:this={scroll_area}
	onscroll={(event) => {
		event.preventDefault();
		handle_scroll(event);
	}}
	onmouseenter={(event) => {
		event.preventDefault();
		handle_mouseenter();
	}}
	onmouseleave={(event) => {
		event.preventDefault();
		handle_mouseleave();
	}}
	class={cn(
		parent_class,
		offset_scrollbar &&
			// Chromium support for scrollbar sucks
			!IS_CHROMIUM &&
			'pr-3 md:pr-[0.75vw]',

		'flex h-full w-full overflow-y-scroll overscroll-y-contain [scrollbar-color:rgba(255,255,255,0.12)transparent]'
	)}
	class:scrollbar-none={IS_CHROMIUM}
	class:scrollbar-thin={IS_FIREFOX}
	class:[mask-image:linear-gradient(180deg,rgba(7,5,25,0.95)80%,rgba(0,0,0,0)100%)]={gradient_mask &&
		add_mask_bottom}
>
	<div class="w-full">
		<IntersectionObserver
			root={scroll_area}
			element={first_element}
			bind:intersecting={first_element_intersecting}
			threshold={1}
		>
			<div bind:this={first_element} class="invisible h-0"></div>
		</IntersectionObserver>

		<div class={cn(klass)}>
			{@render children?.()}
		</div>

		<IntersectionObserver
			root={scroll_area}
			element={end_element}
			bind:intersecting={end_element_intersecting}
			threshold={1}
		>
			<div bind:this={end_element} class="invisible h-0"></div>
		</IntersectionObserver>
	</div>
</div>
