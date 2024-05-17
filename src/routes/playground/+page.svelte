<script lang="ts">
	import Image from "$components/image.svelte";

	let dominant_color = $state("");
	$effect(() => {
		$inspect(dominant_color);
	});
</script>

<div class="h-dvh w-dvw grid place-items-center">
	<div class="w-2/3" style="box-shadow: {dominant_color} 0px 20px 100px 0px;">
		<Image
			src="https://staticg.sportskeeda.com/editor/2023/04/95453-16812287437122-1920.jpg?w=840"
			class="size-full"
			on_color_theif={(color) => dominant_color = color}
		/>
	</div>
</div>