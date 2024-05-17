<script lang="ts">
	import Image from "$components/image.svelte";
	import { get_color_from_thief } from "$functions/get_color_from_thief";

	let dominant_color = $state("");
	$effect(() => {
		$inspect(dominant_color);
	});
</script>

<div class="h-dvh w-dvw grid place-items-center">
	<!-- Hide element to prevent FOUC -->
	<div
		class="w-1/2 transition-opacity duration-500"
		style="box-shadow: {dominant_color} 0px 1vw 11vw 0px;"
		class:opacity-0={!dominant_color}
	>
		<Image
			src="https://staticg.sportskeeda.com/editor/2023/04/95453-16812287437122-1920.jpg?w=840"
			class="size-full"
			on_color_theif={(palette) => dominant_color = get_color_from_thief(palette[0], 0.25)}
		/>
	</div>
</div>
