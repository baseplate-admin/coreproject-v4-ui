<script lang="ts">
	import Episode from './Episode.svelte';
	import type { Episode as EpisodeType } from '$types/episodes';
	import ScrollArea from '$components/scroll_area.svelte';
	import type { SvelteComponent } from 'svelte';

	let scroll_area_element = $state<SvelteComponent>();
	let latest_episodes: EpisodeType[];
	// parse to JSON
</script>

<ScrollArea
	bind:this={scroll_area_element}
	gradient_mask
	offset_scrollbar
	parent_class="mt-[1vw] w-full max-h-[23vw] snap-y smooth-scroll snap-mandatory"
	klass="flex w-full flex-col gap-[1vw]"
>
	{#each latest_episodes as episode, index}
		<Episode {episode} show_more_info={index === 0} {scroll_area_element} />
	{/each}
</ScrollArea>
