<script lang="ts">
	import "../styles/index.postcss";

	const { children } = $props();
</script>

<div class="bg-secondary">
	{@render children()}
</div>
