<script lang="ts">
	import Image from "$components/image.svelte";
	import rgb_hex from "rgb-hex";

	let color_palette = $state<[number, number,  number][]>([]);
	let box_shadow_hex = $state("");

	$effect(() => {
		if (color_palette.length === 0) return;
		$inspect(color_palette.length);
		box_shadow_hex = rgb_hex(...color_palette[0], 0.25);
	});
</script>

<div class="grid h-dvh w-dvw place-items-center">
	<div
		class="w-1/2 transition-opacity duration-500"
		style="box-shadow: #{box_shadow_hex} 0px 1vw 11vw 0px;"
	>
		<Image
			src="https://staticg.sportskeeda.com/editor/2023/04/95453-16812287437122-1920.jpg?w=840"
			class="size-full"
			bind:color_palette
		/>
	</div>
</div>
