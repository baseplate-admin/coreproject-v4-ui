<script lang="ts">
	import { swipe } from "svelte-gestures";
	import { Timer as EasyTimer } from "easytimer.js";
	import { tweened, type Tweened } from "svelte/motion";

	import { FormatDate } from "$functions/format_date";
	import { blur } from "svelte/transition";

	import ScrollArea from "$components/scroll_area.svelte";
	import { t } from "$lib/translations";
	import Image from "$components/dominant_color/index.svelte";
	import { IS_CHROMIUM, IS_FIREFOX } from "$constants/browser";
	import { TIMER_DELAY } from "$constants/timer";
	import {
		autoUpdate,
		flip,
		offset,
		useFloating,
		useHover,
		useInteractions,
		useRole
	} from "@skeletonlabs/floating-ui-svelte";
	import { portal } from "svelte-portal";
	import chroma from "chroma-js";

	// Mock data mappings
	const latest_animes = [
			{
				id: 1,
				name: "Jujutsu Kaisen",
				type: "TV",
				episodes: 24,
				status: "Completed",
				release_date: "Autumn 2014",
				studio: "mappa",
				genres: ["sci-fi", "action", "echhi"],
				synopsis:
					'Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the "King of Curses.',
				image: "/images/mock/cover/jjk.webp"
			},
			{
				id: 2,
				name: "One Piece",
				type: "TV",
				episodes: 12,
				status: "Completed",
				release_date: "Spring 2014",
				studio: "tokito",
				genres: ["hentai", "action", "romance", "smooth"],
				synopsis:
					"Since the premiere of the anime adaptation of Eiichiro Oda's One Piece manga in 1999, Toei Animation has produced 15 feature films based on the franchise traditionally released during the Japanese school spring break since 2000.[1] Four of the films were originally shown as double features alongside other Toei film productions and thus have a running time below feature length (between 30 and 56 minutes). The first three films were shown at the Toei Anime Fair (東映アニメフェア, Toei Anime Fea) and the eleventh was released as part of Jump Heroes Film. The films generally use original storylines, but some adapt story arcs from the manga directly. With the release of films ten, twelve, thirteen, and fourteen, tie-in story arcs of the TV series were aired concurrently. ",
				image: "/images/mock/cover/one_piece.webp"
			},
			{
				id: 3,
				name: "Demon Slayer",
				type: "TV",
				episodes: 12,
				status: "Completed",
				release_date: "Winter 2014",
				studio: "sheldon",
				genres: ["hentai", "action", "romance", "smooth"],
				synopsis:
					"Since the premiere of the anime adaptation of Eiichiro Oda's One Piece manga in 1999, Toei Animation has produced 15 feature films based on the franchise traditionally released during the Japanese school spring break since 2000.[1] Four of the films were originally shown as double features alongside other Toei film productions and thus have a running time below feature length (between 30 and 56 minutes). The first three films were shown at the Toei Anime Fair (東映アニメフェア, Toei Anime Fea) and the eleventh was released as part of Jump Heroes Film. The films generally use original storylines, but some adapt story arcs from the manga directly. With the release of films ten, twelve, thirteen, and fourteen, tie-in story arcs of the TV series were aired concurrently. ",
				image: "/images/mock/cover/demon_slayer_training.webp"
			},
			{
				id: 4,
				name: "Kaiju no.8",
				type: "TV",
				episodes: 8,
				status: "Airing",
				release_date: "Summer 2024",
				studio: "sheldon",
				genres: ["action", "romance", "fantasy"],
				synopsis:
					"Since the premiere of the anime adaptation of Eiichiro Oda's One Piece manga in 1999, Toei Animation has produced 15 feature films based on the franchise traditionally released during the Japanese school spring break since 2000.[1] Four of the films were originally shown as double features alongside other Toei film productions and thus have a running time below feature length (between 30 and 56 minutes). The first three films were shown at the Toei Anime Fair (東映アニメフェア, Toei Anime Fea) and the eleventh was released as part of Jump Heroes Film. The films generally use original storylines, but some adapt story arcs from the manga directly. With the release of films ten, twelve, thirteen, and fourteen, tie-in story arcs of the TV series were aired concurrently. ",
				image: "/images/mock/cover/kaiju_no_8.jpg"
			}
		],
		latest_episodes = [
			{
				id: 1,
				cover: "/images/mock/cover/one_piece.webp",
				banner: "/images/mock/banner/one_piece.avif",
				title: "One Piece",
				ep_number: 20000,
				timestamp: "1 hour ago" // TODO: format time
			},
			{
				id: 2,
				cover: "/images/mock/cover/jjk.webp",
				banner: "/images/mock/banner/jjk.jpg",
				title: "Jujutsu Kaisen season 2",
				ep_number: 5,
				timestamp: "2 hour ago" // TODO: format time
			},
			{
				id: 3,
				cover: "/images/mock/cover/demon_slayer_training.webp",
				banner: "/images/mock/banner/demon_slayer_training.avif",
				title: "Demon Slayer Hashira Training Arc",
				ep_number: 2,
				timestamp: "2 hour ago" // TODO: format time
			},
			{
				id: 4,
				cover: "/images/mock/cover/kaiju_no_8.jpg",
				banner: "/images/mock/banner/kaiju_no_8.webp",
				title: "Kaiju no.8",
				ep_number: 1,
				timestamp: "3 hour ago" // TODO: format time
			}
		],
		sidebar_animes = [
			{
				id: 1,
				title: "Jujutsu Kaisen season 2",
				cover: "/images/mock/cover/jjk.webp",
				ep_number: 2
			},
			{
				id: 2,
				title: "One Piece",
				cover: "/images/mock/cover/one_piece.webp",
				ep_number: 20
			},
			{
				id: 3,
				title: "Kaiju no.8",
				cover: "/images/mock/cover/kaiju_no_8.jpg",
				ep_number: 9
			},
			{
				id: 4,
				title: "Demon Slayer Hashira Training Arc",
				cover: "/images/mock/cover/demon_slayer_training.webp",
				ep_number: 10
			}
		];

	const timer = new EasyTimer({
		target: {
			seconds: TIMER_DELAY
		},
		precision: "secondTenths"
	});

	let main_hero_slide_active_index = $state<number>(0);

	const add_one_to_main_hero_slide_active_index = () => {
			handle_timer_reset();
			if (main_hero_slide_active_index + 1 === latest_animes?.length) {
				main_hero_slide_active_index = 0;
				return;
			}
			main_hero_slide_active_index += 1;
		},
		minus_one_to_main_hero_slide_active_index = () => {
			handle_timer_reset();
			if (main_hero_slide_active_index === 0) {
				main_hero_slide_active_index = latest_animes?.length - 1;
				return;
			}
			main_hero_slide_active_index -= 1;
		},
		change_main_hero_slide_active_index = (idx: number) => {
			handle_timer_reset();
			main_hero_slide_active_index = idx;
		},
		swipe_handler = (event: CustomEvent) => {
			const direction = event.detail.direction;
			handle_timer_reset();

			if (direction === "left") {
				add_one_to_main_hero_slide_active_index();
			} else if (direction === "right") {
				minus_one_to_main_hero_slide_active_index();
			}
		};

	let progress_value = $state<number>(0),
		tweened_progress_value = $state<Tweened<number>>(tweened<number>());
	$effect(() => {
		if (progress_value === 100) {
			tweened_progress_value.set(0, { duration: 0 });
		} else {
			tweened_progress_value.set(progress_value);
		}
	});

	timer.start();
	timer.on("targetAchieved", () => {
		// change slider
		timer.reset();
		add_one_to_main_hero_slide_active_index();
	});

	timer.on("secondTenthsUpdated", () => {
		const time = timer.getTotalTimeValues().secondTenths,
			value = (100 / TIMER_DELAY) * (time / 10);

		progress_value = value;
	});

	function handle_timer_reset() {
		timer.reset();
		tweened_progress_value.set(0, { duration: 0 });
	}

	// states

	const latest_animes_mapping: {
		dominant_color: string | undefined;
		loaded: boolean;
	}[] = $state(
		latest_animes.map(() => ({
			dominant_color: undefined,
			loaded: false
		}))
	);

	const latest_episodes_mapping: {
		color_palette: number[][] | undefined;
		loaded: boolean;
		dominant_color: string | undefined;
		dominant_foreground_color: string | undefined;
	}[] = $state(
		latest_episodes.map(() => ({
			color_palette: undefined,
			dominant_color: undefined,
			dominant_foreground_color: undefined,
			loaded: false
		}))
	);

	const sidebar_mapping: {
		open: boolean;
		color: string | undefined;
		loaded: boolean;
	}[] = $state(
		sidebar_animes.map(() => ({
			open: false,
			color: undefined,
			loaded: false
		}))
	);
</script>

<svelte:window onblur={() => timer.pause()} onfocus={() => timer.start()} />

<div class="mt-16 block md:mt-0 md:p-[1.25vw] md:pr-[3.75vw]">
	<div class="grid md:grid-cols-2 md:gap-[3vw]">
		<div class="flex flex-col md:gap-[1vw]">
			<div
				class="relative h-96 w-full bg-neutral/50 md:h-[28vw] md:rounded-[1.5vw]"
				use:swipe={{ timeframe: 300, minSwipeDistance: 100, touchAction: "pan-y" }}
				onswipe={swipe_handler}
			>
				{#each latest_animes as anime, idx}
					{@const active = idx === main_hero_slide_active_index}
					{@const formated_aired_on = new FormatDate(anime.release_date).format_to_season}
					{@const loaded = latest_animes_mapping[idx].loaded}
					{@const dominant_color = latest_animes_mapping[idx].dominant_color}

					{#if active && loaded && dominant_color}
						<div
							role="presentation"
							transition:blur={{ duration: 300 }}
							onmouseenter={() => timer.pause()}
							onmouseleave={() => timer.start()}
							ontouchstart={() => timer.pause()}
							ontouchend={() => timer.start()}
							class="absolute inset-0 bg-cover bg-center md:rounded-[1.5vw]"
							style="background-image: url({anime.image});"
						>
							<div
								class="absolute inset-0 bg-gradient-to-t from-secondary/90 to-secondary/50"
							></div>
							<div class="absolute inset-0 hidden bg-gradient-to-r md:flex"></div>
							<div class="absolute bottom-0 flex flex-col p-4 md:left-0 md:p-[3vw]">
								<span class="text-3xl font-bold text-white md:text-[2vw] md:leading-[2.375vw]"
									>{anime.name}</span
								>
								<div
									class="flex flex-wrap items-center gap-2 py-2 text-xs font-semibold text-white/90 md:gap-[0.65vw] md:pb-0 md:pt-[0.5vw] md:text-[0.9375vw]"
								>
									<span class="leading-[1.125vw]">{anime.type}</span>
									<coreicons-shape-circle
										variant="filled"
										class="size-1 opacity-75 md:size-[0.35vw]"
									></coreicons-shape-circle>
									<span class="leading-[1.125vw]">{anime.episodes} eps</span>
									<coreicons-shape-circle
										variant="filled"
										class="size-1 opacity-75 md:size-[0.35vw]"
									></coreicons-shape-circle>
									<span class="leading-[1.125vw]">Completed</span>
									<coreicons-shape-circle
										variant="filled"
										class="size-1 opacity-75 md:size-[0.35vw]"
									></coreicons-shape-circle>
									<span class="capitalize leading-[1.125vw]">{formated_aired_on}</span>
									<coreicons-shape-circle
										variant="filled"
										class="size-1 opacity-75 md:size-[0.35vw]"
									></coreicons-shape-circle>
									<span class="leading-[1.125vw]">{anime.studio}</span>
									<div>
										<div class="flex gap-2 pb-2 pt-3 md:gap-[0.5vw] md:pt-0">
											{#each anime.genres as genre}
												<span
													class="rounded-lg bg-secondary/80 p-2 px-3 text-xs capitalize leading-none text-accent duration-300 md:rounded-[0.5vw] md:px-[0.75vw] md:py-[0.5vw] md:text-[0.75vw] md:font-semibold"
												>
													{genre}
												</span>
											{/each}
										</div>
										<ScrollArea
											gradient_mask
											offset_scrollbar
											parent_class="max-h-16 md:max-h-[6vw] hidden md:flex md:mt-[0.75vw]"
											class="text-xs font-medium leading-4 md:text-[0.85vw] md:leading-[1.1vw]"
										>
											{anime.synopsis}
										</ScrollArea>

										<div
											class="mb-2 mt-5 flex items-center gap-2.5 md:mb-0 md:mt-[1.5vw] md:gap-[1vw]"
										>
											<a
												href="anime/mal/{anime.id}/episode/1"
												class="btn btn-info flex min-h-max flex-nowrap justify-center gap-2 rounded-xl border-none text-base font-bold leading-none md:h-[3.5vw] md:gap-[0.5vw] md:rounded-[1vw] md:px-[1.5vw] md:text-[1vw]"
												class:!bg-[var(--dominant-color)]={dominant_color}
												style="--dominant-color: {chroma.contrast('#03020C', dominant_color) > 4.5
													? dominant_color
													: chroma(dominant_color).brighten(2)}"
											>
												<coreicons-shape-play class="size-5 md:size-[1.35vw]"
												></coreicons-shape-play>
												<span>Ep 1</span>
											</a>
											<a
												href="anime/mal/{anime.id}"
												class="btn btn-secondary flex min-h-max flex-nowrap justify-center gap-2 rounded-xl border-none text-base font-semibold leading-none text-info md:h-[3.5vw] md:gap-[0.5vw] md:rounded-[1vw] md:px-[1.5vw] md:text-[1vw]"
											>
												<coreicons-shape-info class="size-5 md:size-[1.35vw]"
												></coreicons-shape-info>
												<span>Details</span>
											</a>
											<button
												aria-label="edit"
												class="btn btn-square btn-secondary flex min-h-max flex-nowrap justify-center gap-2 rounded-xl border-none text-base font-semibold leading-none text-info md:size-[3.5vw] md:gap-[0.5vw] md:rounded-[1vw]"
											>
												<coreicons-shape-edit
													variant="line-with-pencil"
													class="size-5 md:size-[1.35vw]"
												></coreicons-shape-edit>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/if}
					<Image
						src={anime.image}
						class="invisible absolute"
						bind:image_loaded={latest_animes_mapping[idx].loaded}
						bind:dominant_color={latest_animes_mapping[idx].dominant_color}
					/>
				{/each}
			</div>
			<div class="flex w-full items-center gap-3 p-5 md:gap-[1vw] md:p-0">
				<button
					aria-label="left slide btn"
					class="btn btn-square btn-neutral size-7 min-h-max rounded-xl p-0 md:size-[2vw] md:rounded-[0.75vw]"
					onclick={minus_one_to_main_hero_slide_active_index}
				>
					<coreicons-shape-chevron variant="left" class="size-4 md:size-[1.25vw]"
					></coreicons-shape-chevron>
				</button>
				<div class="flex w-full flex-col gap-2 md:gap-[0.75vw]">
					{#each latest_animes_mapping as item, idx}
						{#if item.dominant_color && item.loaded}
							<div
								hidden={main_hero_slide_active_index !== idx}
								class="h-0.5 rounded-full bg-primary md:h-[0.25vw]"
								class:!bg-[var(--dominant-color)]={item.loaded}
								style="
									   width: {$tweened_progress_value}%;
									   --dominant-color: {chroma.contrast('#1E2036', item.dominant_color) > 4.5
									? item.dominant_color
									: chroma(item.dominant_color).brighten(2)};
								"
							></div>
						{:else}
							<div
								hidden={idx !== 0}
								class="h-0.5 w-full rounded-full bg-neutral md:h-[0.25vw]"
							></div>
						{/if}
					{/each}
					<div class="flex w-full items-center gap-2 md:gap-[1vw]">
						{#each latest_animes_mapping as item, idx}
							{#if item.loaded}
								<button
									aria-label="slider block"
									tabindex="0"
									class="h-2 w-full cursor-pointer overflow-hidden rounded border-2 border-[var(--item-color)] duration-300 ease-out md:h-[0.75vw] md:rounded-[0.25vw] md:border-[0.2vw]"
									class:bg-[var(--item-color)]={main_hero_slide_active_index === idx}
									style="--item-color: {item.dominant_color};"
									onclick={() => change_main_hero_slide_active_index(idx)}
								></button>
							{:else}
								<div class="h-2 w-full rounded bg-neutral md:h-[0.7vw] md:rounded-[0.25vw]"></div>
							{/if}
						{/each}
					</div>
				</div>
				<button
					aria-label="slider right btn"
					class="btn btn-square btn-neutral size-7 min-h-max rounded-xl p-0 md:size-[2vw] md:rounded-[0.75vw]"
					onclick={add_one_to_main_hero_slide_active_index}
				>
					<coreicons-shape-chevron variant="right" class="size-4 md:size-[1.25vw]"
					></coreicons-shape-chevron>
				</button>
			</div>
		</div>
		<div class="flex flex-col p-5 md:h-[28vw] md:gap-[1vw] md:p-0">
			<span class="text-xl font-bold text-accent md:text-[1.35vw]"
				>{$t("home.latest_episodes.title")}</span
			>
			<div class="hidden size-full md:flex md:gap-[0.5vw]">
				<div
					class="grid-rows-auto relative grid w-full snap-y auto-rows-min grid-cols-2 overflow-x-hidden overflow-y-scroll scroll-smooth [scrollbar-color:rgba(255,255,255,0.12)transparent] md:gap-[1vw] md:pr-[1.5vw]"
					class:scrollbar-none={IS_CHROMIUM}
					class:scrollbar-thin={IS_FIREFOX}
				>
					{#each latest_episodes as episode, idx}
						{@const image_loaded = latest_episodes_mapping[idx].loaded}
						{@const dominant_color = latest_episodes_mapping[idx].dominant_color}

						{#if image_loaded && dominant_color}
							<div
								in:blur
								class="relative w-full snap-start border-[var(--dominant-color)] bg-cover bg-center duration-300 [background-image:var(--background-image)] md:h-[5vw] md:rounded-[1vw] md:border-[0.15vw]"
								style="
									--background-image: url({episode.banner});
									--dominant-color: {dominant_color};
									--dominant-fg-color: {chroma.contrast('#03020C', dominant_color) > 4.5
									? dominant_color
									: chroma(dominant_color).brighten(2)};
								"
							>
								<div class="absolute inset-0 bg-secondary/75 md:rounded-[1vw]"></div>
								<div class="relative flex size-full items-center md:gap-[1vw] md:p-[0.5vw]">
									<img
										src={episode.cover}
										alt=""
										class="h-full object-cover object-center md:w-[2.5vw] md:rounded-[0.75vw]"
									/>
									<div class="flex flex-1 flex-col md:gap-[0.15vw]">
										<span class="line-clamp-1 font-bold text-accent md:text-[1.15vw]"
											>{episode.title}</span
										>
										<div
											class="flex items-center font-semibold md:gap-[0.5vw] md:text-[0.8vw] md:leading-none"
										>
											<span class="whitespace-nowrap"
												>Ep {episode.ep_number.toString().padStart(2, "0")}</span
											>
											<coreicons-shape-circle variant="filled" class="opacity-75 md:size-[0.35vw]"
											></coreicons-shape-circle>
											<span class="line-clamp-1">{episode.timestamp}</span>
										</div>
									</div>
									<a
										aria-label="play anime btn"
										href="/anime/mal/{episode.id}/episode/{episode.ep_number}"
										class="btn h-max min-h-max border-none !bg-[var(--dominant-fg-color)] md:mr-[0.5vw] md:rounded-[1vw] md:p-[0.75vw]"
									>
										<coreicons-shape-play class="text-secondary md:size-[1.25vw]"
										></coreicons-shape-play>
									</a>
								</div>
							</div>
						{:else}
							<div
								class="flex items-center bg-neutral/25 md:h-[5vw] md:gap-[1vw] md:rounded-[0.75vw] md:p-[0.5vw]"
							>
								<div class="h-full bg-neutral md:w-[2.5vw] md:rounded-[0.5vw]"></div>
								<div class="flex flex-1 flex-col md:gap-[0.5vw]">
									<div class="rounded-full bg-neutral md:h-[1vw]"></div>
									<div class="w-1/2 rounded-full bg-neutral md:h-[0.5vw]"></div>
								</div>
								<div class="rounded-full bg-neutral md:mr-[0.5vw] md:size-[2.75vw]"></div>
							</div>
						{/if}
						<!-- use Image component for just to get color -->
						<Image
							src={episode.cover}
							class="invisible absolute"
							bind:image_loaded={latest_episodes_mapping[idx].loaded}
							bind:color_palette={latest_episodes_mapping[idx].color_palette}
							bind:dominant_color={latest_episodes_mapping[idx].dominant_color}
						/>
					{/each}
				</div>
				<div
					class="flex h-full flex-col items-center bg-info md:w-[4vw] md:gap-[0.75vw] md:rounded-[1vw] md:p-[0.5vw]"
				>
					<button
						aria-label="preferences"
						class="btn btn-secondary min-h-max p-0 md:size-[3vw] md:rounded-[0.75vw]"
					>
						<coreicons-shape-preferences class="md:size-[1.25vw]"></coreicons-shape-preferences>
					</button>
					<button
						aria-label="random anime"
						class="btn btn-secondary min-h-max p-0 md:size-[3vw] md:rounded-[0.75vw]"
					>
						<coreicons-shape-dice class="md:size-[1.5vw]"></coreicons-shape-dice>
					</button>
					<div class="rounded-full bg-secondary md:h-[0.2vw] md:w-1/2"></div>
					<ScrollArea
						parent_class="snap-y md:rounded-[0.65vw] !scrollbar-none md:w-[3vw]"
						class="relative flex flex-1 flex-col overflow-hidden md:w-full md:gap-[0.75vw]"
					>
						{#each sidebar_animes as anime, idx}
							{@const loaded = sidebar_mapping[idx].loaded}

							{@const floating = useFloating({
								whileElementsMounted: autoUpdate,
								get open() {
									return sidebar_mapping[idx].open;
								},
								onOpenChange: (v) => (sidebar_mapping[idx].open = v),
								placement: "left",
								get middleware() {
									return [
										offset(({ rects }) => {
											return rects.reference.width * 0.3;
										}),
										flip()
									];
								}
							})}

							{@const role = useRole(floating.context, { role: "tooltip" })}
							{@const hover = useHover(floating.context)}
							{@const intersections = useInteractions([role, hover])}

							{#if loaded}
								<a
									aria-label="anime sidebar"
									bind:this={floating.elements.reference}
									{...intersections.getReferenceProps()}
									href="/anime/mal/{anime.id}/episode/{anime.ep_number}"
									in:blur
								>
									<img
										src={anime.cover}
										class="w-full snap-start md:h-[4.5vw] md:rounded-[0.75vw]"
										alt=""
									/>
								</a>

								{#if sidebar_mapping[idx].open}
									<div
										use:portal={"body"}
										bind:this={floating.elements.floating}
										{...intersections.getFloatingProps()}
										style="
											{floating.floatingStyles};
											--dominant-color: {sidebar_mapping[idx].color};
											--dominant-color-opacity: {sidebar_mapping[idx].color}50
										"
										transition:blur={{ duration: 250 }}
										class="!bg-[var(--dominant-color)] bg-warning text-secondary drop-shadow-[0.25vw_0.5vw_0.5vw_var(--dominant-color-opacity)] md:rounded-[0.35vw] md:px-[0.75vw] md:py-[0.25vw] md:text-[0.8vw]"
									>
										continue watching <span class="md:text-[0.9vw]">{anime.title}</span> Ep {anime.ep_number
											.toString()
											.padStart(2, "0")}
									</div>
								{/if}
							{:else}
								<div class="w-full bg-secondary/50 md:h-[5vw] md:rounded-[0.65vw]"></div>
							{/if}
							<!-- use Image component for just to get color -->
							<Image
								src={anime.cover}
								class="invisible absolute size-0"
								bind:image_loaded={sidebar_mapping[idx].loaded}
								bind:dominant_foreground_color={sidebar_mapping[idx].color}
							/>
						{/each}
					</ScrollArea>
					<button
						aria-label="scroll sidebar anime btn"
						class="btn btn-secondary grid min-h-max place-items-center p-0 md:h-[1.25vw] md:w-[3vw] md:rounded-[0.75vw]"
					>
						<coreicons-shape-chevron variant="down" class="md:size-[1vw]"></coreicons-shape-chevron>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col p-5 pt-7 md:mb-[1vw] md:mt-[2vw] md:flex md:w-[68vw] md:p-0">
		<div class="flex items-center gap-[0.625vw]">
			<span class="text-xl font-bold text-accent md:text-[1.25vw]">{$t("home.my_list.title")}</span>
			<button
				aria-label="mylist settings btn"
				class="btn btn-neutral hidden min-h-full rounded-[0.5vw] p-0 md:flex md:h-[1.5vw] md:w-[1.5vw]"
			>
				<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
				></coreicons-shape-settings>
			</button>
		</div>
		<div class="flex items-center items-center justify-between">
			<span class="text-sm font-semibold md:text-[1vw]"> 7 animes </span>
			<div class="hidden items-center gap-[1vw] md:flex">
				<button
					class="btn btn-neutral h-[2.25vw] min-h-max gap-[0.625vw] rounded-[0.75vw] p-0 text-[0.875vw] font-semibold md:px-[0.75vw]"
				>
					{$t("home.my_list.options.watching")}
					<coreicons-shape-chevron variant="down" class="w-[1vw]"></coreicons-shape-chevron>
				</button>
				<button
					class="btn btn-neutral h-[2.25vw] min-h-max gap-[0.625vw] rounded-[0.75vw] p-0 text-[0.875vw] font-semibold md:px-[0.75vw]"
				>
					{$t("home.my_list.cta")}
					<coreicons-shape-arrow variant="right" class="w-[1vw] rotate-45"></coreicons-shape-arrow>
				</button>
			</div>
			<div class="md:hidden">
				<button class="btn btn-neutral btn-xs gap-2 text-xs">
					{$t("home.my_list.cta")}
					<coreicons-shape-chevron variant="down" class="text-primary-400 w-4"
					></coreicons-shape-chevron>
				</button>
			</div>
		</div>
		<div class="relative mt-3 grid grid-cols-3 gap-3 md:mt-[1vw] md:grid-cols-5 md:gap-[1.25vw]">
			<!-- <MyAnimeList {my_anime_list} dropdown_class="pl-3" /> -->
		</div>
	</div>
</div>
