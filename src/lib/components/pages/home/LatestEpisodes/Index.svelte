<script lang="ts">
	import Episode from "./Episode.svelte";
	import type { Episode as EpisodeType } from "$types/episodes";
	import ScrollArea from "$components/scroll_area.svelte";

	let { latest_episodes }: { latest_episodes: EpisodeType[] } = $props();
</script>

<ScrollArea
	gradient_mask
	offset_scrollbar
	parent_class="mt-[1vw] w-full max-h-[23vw] snap-y smooth-scroll snap-mandatory"
	class="flex w-full flex-col gap-[1vw]"
>
	{#snippet children()}
		{#each latest_episodes as episode, index}
			{@const is_first = episode === latest_episodes.at(1)}
			{@const is_last = episode === latest_episodes.at(-1)}
			<Episode {episode} position={is_first ? "first" : is_last ? "last" : undefined} />
		{/each}
	{/snippet}
</ScrollArea>
