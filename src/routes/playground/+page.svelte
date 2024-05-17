<script lang="ts">
	import Image from "$components/image.svelte";

	let dominant_color = $state("");
	$effect(() => {
		$inspect(dominant_color);
	});
</script>

<div class="h-dvh w-dvw grid place-items-center">
	<Image
		src="https://staticg.sportskeeda.com/editor/2023/04/95453-16812287437122-1920.jpg?w=840"
		class="w-2/3 h-auto"
		on_color_theif={(color) => dominant_color = color}
	/>
</div>