<script lang="ts">
	import { tick, type Snippet } from "svelte";

	let {
		children,
		element,
		once,
		intersecting = $bindable(),
		root,
		rootMargin,
		threshold,
		entry,
		observer,
		observe,
		intersect
	}: { children: Snippet } & Partial<{
		element: HTMLElement;
		once: boolean;
		intersecting: boolean;
		root: HTMLElement;
		rootMargin: string;
		threshold: number | number[];
		entry: IntersectionObserverEntry;
		observer: IntersectionObserver;
		observe: (entry: IntersectionObserverEntry) => void;
		intersect: (entry: IntersectionObserverEntry) => void;
	}> = $props();

	let prevRootMargin = $state<string>(),
		prevElement = $state<HTMLElement>();

	const initialize = () => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((_entry) => {
					entry = _entry;
					intersecting = _entry.isIntersecting;
				});
			},
			{ root, rootMargin, threshold }
		);
	};

	const cleanup = $effect.root(() => {
		$effect(() => initialize());

		return () => {
			if (observer) {
				observer.disconnect();
				observer = undefined;
			}
		};
	})

	$effect(() => {
		if (entry !== undefined) {
			if (observe) observe(entry);

			if (entry.isIntersecting) {
				if(intersect) intersect(entry);
				if (element && once) observer?.unobserve(element);
			}
		}

		tick().then(() => {
			if (element !== undefined && element !== prevElement) {
				observer?.observe(element);

				if (prevElement !== undefined) observer?.unobserve(prevElement);
				prevElement = element;
			}

			if (prevRootMargin && rootMargin !== prevRootMargin) {
				observer?.disconnect();
				prevElement = undefined;
				initialize();
			}
		});

		prevRootMargin = rootMargin;
	});
</script>

{@render children()}
