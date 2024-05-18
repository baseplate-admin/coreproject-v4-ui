<script lang="ts">
	import Image from "$components/image.svelte";

	let color_palette = $state<number[][]>([]);
	$effect(() => {
		$inspect(color_palette);
	});
</script>

<div class="grid h-dvh w-dvw place-items-center">
	<!-- Hide element to prevent FOUC -->
	<div
		class="w-1/2 transition-opacity duration-500"
		style="box-shadow: rgba({color_palette.join(',')},10) 50 0px 1vw 11vw 0px;"
	>
		<Image
			src="https://staticg.sportskeeda.com/editor/2023/04/95453-16812287437122-1920.jpg?w=840"
			class="size-full"
			bind:color_palette
		/>
	</div>
</div>
