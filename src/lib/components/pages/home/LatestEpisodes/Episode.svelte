<script lang="ts">
	import { FormatDate } from "$functions/format_date";
	import ScrollArea from "$components/scroll_area.svelte";

	import { scale } from "svelte/transition";
	import Play from "$icons/shapes/play.svelte";

	type Episode = {
		id: number;
		cover: string;
		name: string;
		episode_number: number;
		release_date: string;
		synopsis: string;
	};

	let { episode, position }: { episode: Episode; position: "first" | "last" | undefined } =
		$props();

	/* Bindings */
	let ANIMATION_DURATION = 100;

	let show_more_info = $state(false);

	/** Bindings */

	function handle_mouseenter() {
		show_more_info = true;
	}

	function handle_mouseleave() {
		show_more_info = false;
	}

	function handle_animationstart() {}

	const formated_episode_number = String(episode.episode_number).padStart(2, "0"),
		formated_release_date = new FormatDate(episode.release_date).format_to_time_from_now;
</script>

<div
	onmouseenter={handle_mouseenter}
	onmouseleave={handle_mouseleave}
	role="group"
	class="group relative h-[5vw] shrink-0 snap-center duration-300 ease-in-out"
	class:!h-[16vw]={show_more_info}
>
	<img
		src={episode.cover}
		alt=""
		class="absolute h-full w-full rounded-[0.75vw] object-cover object-center"
	/>
	<div class="gradient absolute inset-0 bg-gradient-to-t from-secondary/75 to-transparent"></div>
	<div class="gradient absolute inset-0 bg-gradient-to-r from-secondary/50 to-transparent"></div>

	<div class="absolute inset-0 flex items-start justify-between p-[1.3125vw]">
		<div class="flex flex-col gap-[0.25vw]">
			<div class="text-[1vw] font-semibold leading-[1.1875vw] text-white">
				{episode.name}
			</div>
			<div class="flex items-center gap-[0.35vw] text-[0.8vw] text-accent">
				<span class="font-semibold">
					Ep {formated_episode_number}
				</span>
				<span>
					aired {formated_release_date}
				</span>
			</div>
		</div>
		<a
			href="mal/{episode.id}/episode/{episode.episode_number}"
			class="btn btn-warning size-[2.5vw] min-h-max rounded-full p-0 transition-colors duration-300 group-hover:btn-accent"
			class:!btn-accent={show_more_info}
		>
			<Play class="w-[1vw]" />
		</a>
	</div>

	{#if show_more_info}
		<div
			in:scale={{
				duration: ANIMATION_DURATION
			}}
			out:scale
			class="absolute inset-x-0 bottom-0 flex flex-col gap-[0.5vw] p-[1.3125vw]"
		>
			<genres class="flex items-center md:my-[0.35vw] md:gap-[0.5vw]">
				{#each ["Action", "Romance", "Hentai"] as genre}
					<genre
						class="bg-warning font-semibold leading-none text-secondary md:rounded-[0.25vw] md:px-[0.6vw] md:py-[0.3vw] md:text-[0.8vw]"
					>
						{genre}
					</genre>
				{/each}
			</genres>
			<ScrollArea
				offset_scrollbar
				gradient_mask
				class="h-[6vw] text-[0.8vw] leading-[1vw] text-accent"
			>
				{episode.synopsis}
			</ScrollArea>
		</div>
	{/if}
</div>
