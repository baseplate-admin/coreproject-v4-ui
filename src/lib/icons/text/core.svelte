<script lang="ts">
	import { cn } from '$functions/classnames';

	let { class: klass, style }: Partial<{ class: string; style: string }> = $props();
</script>

<p class={cn(klass, 'inline-flex')} {style}>
	<span class="text-white/90">c</span>
	<span class="text-warning">o</span>
	<span class="text-white/90">r</span>
	<span class="text-white/90">e</span>
</p>
