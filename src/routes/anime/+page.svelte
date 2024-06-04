<script lang="ts">
	import Chevron from "$icons/shapes/chevron.svelte";
	import Settings from "$icons/shapes/settings.svelte";
	import ArrowUpRight from "$icons/shapes/arrow_up_right.svelte";

	import { swipe } from "svelte-gestures";
	import { Timer as EasyTimer } from "easytimer.js";
	import { tweened, type Tweened } from "svelte/motion";

	import { FormatDate } from "$functions/format_date";
	import { blur } from "svelte/transition";
	import Circle from "$icons/shapes/circle.svelte";
	import Play from "$icons/shapes/play.svelte";
	import Info from "$icons/shapes/info.svelte";
	import Edit from "$icons/shapes/edit.svelte";
	import Preference from "$icons/shapes/preference.svelte";
	import Dice from "$icons/shapes/dice.svelte";

	import ScrollArea from "$components/scroll_area.svelte";
	import { cn } from "$functions/classnames";
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
				synopsis: `Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the "King of Curses.`,
				image: "https://staticg.sportskeeda.com/editor/2023/04/95453-16812287437122-1920.jpg?w=840"
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
				synopsis: `Since the premiere of the anime adaptation of Eiichiro Oda's One Piece manga in 1999, Toei Animation has produced 15 feature films based on the franchise traditionally released during the Japanese school spring break since 2000.[1] Four of the films were originally shown as double features alongside other Toei film productions and thus have a running time below feature length (between 30 and 56 minutes). The first three films were shown at the Toei Anime Fair (東映アニメフェア, Toei Anime Fea) and the eleventh was released as part of Jump Heroes Film. The films generally use original storylines, but some adapt story arcs from the manga directly. With the release of films ten, twelve, thirteen, and fourteen, tie-in story arcs of the TV series were aired concurrently. `,
				image: "https://bg-so-1.zippyimage.com/2021/05/29/bcb474d59354a3d20036490aa807fc77.png"
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
				synopsis: `Since the premiere of the anime adaptation of Eiichiro Oda's One Piece manga in 1999, Toei Animation has produced 15 feature films based on the franchise traditionally released during the Japanese school spring break since 2000.[1] Four of the films were originally shown as double features alongside other Toei film productions and thus have a running time below feature length (between 30 and 56 minutes). The first three films were shown at the Toei Anime Fair (東映アニメフェア, Toei Anime Fea) and the eleventh was released as part of Jump Heroes Film. The films generally use original storylines, but some adapt story arcs from the manga directly. With the release of films ten, twelve, thirteen, and fourteen, tie-in story arcs of the TV series were aired concurrently. `,
				image:
					"https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/03/demon-slayer-banner.jpg"
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
		}),
		slide_buttons = [
			{ background: "bg-accent", border: "border-accent" },
			{ background: "bg-info", border: "border-info" },
			{ background: "bg-warning", border: "border-warning" },
			{ background: "bg-white", border: "border-white" },
			{ background: "bg-primary", border: "border-primary" },
			{ background: "bg-error", border: "border-error" }
		];

	let main_hero_slide_active_index = $state<number>(0);

	const add_one_to_main_hero_slide_active_index = () => {
			timer.reset();
			if (main_hero_slide_active_index + 1 === latest_animes.length) {
				main_hero_slide_active_index = 0;
				return;
			}
			main_hero_slide_active_index += 1;
		},
		minus_one_to_main_hero_slide_active_index = () => {
			timer.reset();
			if (main_hero_slide_active_index === 0) {
				main_hero_slide_active_index = latest_animes.length - 1;
				return;
			}
			main_hero_slide_active_index -= 1;
		},
		change_main_hero_slide_active_index = (idx: number) => {
			timer.reset();
			main_hero_slide_active_index = idx;
		},
		swipe_handler = (event: CustomEvent) => {
			const direction = event.detail.direction;
			timer.reset();

			if (direction === "left") {
				add_one_to_main_hero_slide_active_index();
			} else if (direction === "right") {
				minus_one_to_main_hero_slide_active_index();
			}
		};

	let progress_value = $state<number>(0),
		tweened_progress_value = $state<Tweened<number>>(tweened<number>());
	$effect(() => {
		tweened_progress_value.set(progress_value);
	});

	timer.start();
	timer.on("targetAchieved", () => {
		// change slider
		add_one_to_main_hero_slide_active_index();
		timer.reset();
	});

	timer.on("secondTenthsUpdated", () => {
		const time = timer.getTotalTimeValues().secondTenths,
			value = (100 / TIMER_DELAY) * (time / 10);

		progress_value = value;
	});

	// state for latest_episodes color palette
	const latest_episodes_mapping: {
		color_palette: [number, number, number][] | undefined;
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

	// open state for sidebar tooltips
	const sidebar_mapping = $state(
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
		<div
			class="relative h-96 w-full md:h-[28.75vw]"
			use:swipe={{ timeframe: 300, minSwipeDistance: 100, touchAction: "pan-y" }}
			onswipe={swipe_handler}
		>
			{#each latest_animes as anime, idx}
				{@const active = idx === main_hero_slide_active_index}
				{@const formated_aired_on = new FormatDate(anime.release_date).format_to_season}

				{#if active}
					<div
						role="presentation"
						class="absolute inset-0 md:bottom-[2vw]"
						transition:blur
						onmouseenter={() => timer.pause()}
						onmouseleave={() => timer.start()}
						ontouchstart={() => timer.pause()}
						ontouchend={() => timer.start()}
					>
						<img
							src={anime.image}
							alt=""
							class="absolute h-full w-full object-cover object-center md:rounded-t-[0.875vw]"
						/>
						<div
							class="md:to-surface-900/25 absolute inset-0 bg-gradient-to-t from-secondary/90 to-secondary/50"
						></div>
						<div
							class="from-surface-900 to-surface-900/25 md:from-surface-900/50 absolute inset-0 hidden bg-gradient-to-r md:flex"
						></div>
						<div
							class="absolute bottom-0 flex flex-col p-4 md:left-0 md:px-[3.75vw] md:py-[2.625vw]"
						>
							<span class="text-3xl font-bold text-white md:text-[2vw] md:leading-[2.375vw]"
								>{anime.name}</span
							>
							<div
								class="flex flex-wrap items-center gap-2 py-2 text-xs font-semibold text-white/90 md:gap-[0.65vw] md:pb-0 md:pt-[0.5vw] md:text-[0.9375vw]"
							>
								<span class="leading-[1.125vw]">{anime.type}</span>
								<Circle class="w-1 opacity-75 md:w-[0.25vw]" />
								<span class="leading-[1.125vw]">{anime.episodes} eps</span>
								<Circle class="w-1 opacity-75 md:w-[0.25vw]" />
								<span class="leading-[1.125vw]">Completed</span>
								<Circle class="w-1 opacity-75 md:w-[0.25vw]" />
								<span class="capitalize leading-[1.125vw]">{formated_aired_on}</span>
								<Circle class="w-1 opacity-75 md:w-[0.25vw]" />
								<span class="leading-[1.125vw]">{anime.studio}</span>
								<div>
									<div class="flex gap-2 pb-2 pt-3 md:gap-[0.5vw] md:pt-0">
										{#each anime.genres as genre}
											<span
												class="rounded-lg bg-secondary p-2 px-3 text-xs capitalize leading-none md:rounded-[0.35vw] md:px-[0.75vw] md:py-[0.4vw] md:text-[0.75vw] md:font-semibold"
											>
												{genre}
											</span>
										{/each}
									</div>
									<ScrollArea
										gradient_mask
										offset_scrollbar
										parent_class="max-h-16 md:max-h-[6vw] hidden md:flex md:mt-[0.75vw]"
										class="text-surface-200 text-xs font-medium leading-4 md:text-[0.85vw] md:leading-[1.1vw]"
									>
										{anime.synopsis}
									</ScrollArea>

									<div class="mb-2 mt-5 flex items-center gap-2 md:mb-0 md:mt-[1.5vw] md:gap-[1vw]">
										<a
											href="mal/{anime.id}/episode/1"
											class="btn btn-warning flex h-max min-h-max justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold leading-none text-secondary md:gap-[0.5vw] md:rounded-[0.625vw] md:px-[1.25vw] md:py-[1vw] md:text-[0.875vw]"
										>
											<Play class="text-surface-900 w-4 md:w-[1vw]" />
											<span>Ep 1</span>
										</a>
										<a
											href="mal/{anime.id}"
											class="btn btn-secondary flex h-max min-h-max items-center justify-center rounded-xl px-6 py-4 text-base font-semibold leading-none md:gap-[0.5vw] md:rounded-[0.5vw] md:px-[1.25vw] md:py-[1vw] md:text-[0.875vw] md:font-bold"
										>
											<Info class="text-surface-50 w-5 md:w-[1.25vw]" />
											<span>Details</span>
										</a>
										<button
											class="bg-surface-900 text-surface-50s btn btn-secondary h-max min-h-max rounded-xl p-4 text-[3vw] font-bold leading-none md:rounded-[0.5vw] md:p-[0.9vw] md:text-[0.875vw]"
										>
											<Edit
												variant="without_underline_around_pencil"
												class="text-surface-50 w-4 md:w-[1.25vw]"
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			{/each}
			<div class="absolute bottom-0 flex w-full flex-col">
				<div
					class="h-[0.2rem] bg-warning md:h-[0.145vw] {slide_buttons[main_hero_slide_active_index]
						.background}"
					style="width: {$tweened_progress_value}%;"
				></div>
				<div class="hidden w-full grid-cols-6 gap-[0.9375vw] md:mt-[1.25vw] md:grid">
					{#each latest_animes as _, idx}
						<button
							class={cn(
								"col-span-1 h-[0.625vw] w-full rounded-[0.1875vw] border-[0.15vw]",
								slide_buttons[idx].border,
								"hover:border-surface-50/50 transition duration-300",
								idx === main_hero_slide_active_index && slide_buttons[idx].background
							)}
							onclick={() => change_main_hero_slide_active_index(idx)}
						></button>
					{/each}
				</div>
			</div>
			<button
				class="btn btn-primary absolute -left-[1vw] top-[12vw] z-20 hidden h-[2.25vw] min-h-max w-[2.25vw] rounded-[0.375vw] p-0 text-accent md:flex"
				onclick={minus_one_to_main_hero_slide_active_index}
			>
				<Chevron class="w-[1.25vw] rotate-90" />
			</button>
			<button
				class="bg-secondary-800 btn btn-primary absolute -right-[1vw] top-[12vw] z-20 hidden h-[2.25vw] min-h-max w-[2.25vw] rounded-[0.375vw] p-0 text-accent md:flex"
				onclick={add_one_to_main_hero_slide_active_index}
			>
				<Chevron class="w-[1.25vw] -rotate-90" />
			</button>
		</div>
		<div class="flex flex-col p-4 md:h-[24vw] md:gap-[1vw] md:p-0">
			<span class="font-bold text-accent md:text-[1.35vw]">{$t("home.latest_episodes.title")}</span>
			<div class="hidden size-full md:flex md:gap-[0.5vw]">
				<div
					class="grid-rows-auto grid w-full snap-y auto-rows-min grid-cols-2 overflow-y-scroll scroll-smooth [scrollbar-color:rgba(255,255,255,0.12)transparent] md:gap-[1.25vw] md:pr-[1.5vw]"
					class:scrollbar-none={IS_CHROMIUM}
					class:scrollbar-thin={IS_FIREFOX}
				>
					{#each latest_episodes as episode, idx}
						{@const image_loaded = latest_episodes_mapping[idx].loaded}

						{#if image_loaded}
							<div
								in:blur
								class="relative w-full snap-start border-[var(--dominant-color)] bg-cover bg-center duration-300 [background-image:var(--background-image)] md:h-[5vw] md:rounded-[0.75vw] md:border-[0.15vw]"
								style="
									--background-image: url({episode.banner});
									--dominant-color: {latest_episodes_mapping[idx].dominant_color};
									--dominant-foreground-color: {latest_episodes_mapping[idx].dominant_foreground_color}
								"
							>
								<div class="absolute inset-0 bg-secondary/75 md:rounded-[0.75vw]"></div>
								<div class="relative flex size-full items-center md:gap-[1vw] md:p-[0.5vw]">
									<img
										src={episode.cover}
										alt=""
										class="h-full object-cover object-center md:w-[2.5vw] md:rounded-[0.5vw]"
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
											<Circle class="opacity-75 md:size-[0.25vw]" />
											<span class="line-clamp-1">{episode.timestamp}</span>
										</div>
									</div>
									<a
										href="/anime/mal/{episode.id}/episode/{episode.ep_number}"
										class="btn h-max min-h-max rounded-full border-none !bg-[var(--dominant-foreground-color)] md:mr-[0.5vw] md:p-[0.75vw]"
									>
										<Play class="md:size-[1.25vw]" />
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
							class="absolute -z-10"
							bind:image_loaded={latest_episodes_mapping[idx].loaded}
							bind:color_palette={latest_episodes_mapping[idx].color_palette}
							bind:dominant_color={latest_episodes_mapping[idx].dominant_color}
							bind:dominant_foreground_color={latest_episodes_mapping[idx]
								.dominant_foreground_color}
						/>
					{/each}
				</div>
				<div
					class="flex h-full flex-col items-center bg-accent/90 md:w-[4vw] md:gap-[0.5vw] md:rounded-[0.75vw] md:p-[0.35vw]"
				>
					<button
						class="btn btn-secondary min-h-max p-0 text-accent md:size-[3vw] md:rounded-[0.65vw]"
					>
						<Preference class="md:size-[1.25vw]" />
					</button>
					<button
						class="btn btn-secondary min-h-max p-0 text-accent md:size-[3vw] md:rounded-[0.65vw]"
					>
						<Dice class="md:size-[1.25vw]" />
					</button>
					<div class="w-1/2 rounded-full bg-secondary md:h-[0.15vw]"></div>
					<ScrollArea
						gradient_mask
						parent_class="snap-y md:rounded-[0.65vw]"
						class="flex flex-1 flex-col md:w-[3vw] md:gap-[0.5vw]"
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
									bind:this={floating.elements.reference}
									{...intersections.getReferenceProps()}
									href="/anime/mal/{anime.id}/episode/{anime.ep_number}"
									in:blur
								>
									<img
										src={anime.cover}
										class="w-full snap-start md:h-[5vw] md:rounded-[0.65vw]"
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
								<div class="w-full bg-neutral/25 md:h-[5vw] md:rounded-[0.65vw]"></div>
							{/if}
							<!-- use Image component for just to get color -->
							<Image
								src={anime.cover}
								class="invisible absolute -z-20"
								bind:image_loaded={sidebar_mapping[idx].loaded}
								bind:dominant_foreground_color={sidebar_mapping[idx].color}
							/>
						{/each}
					</ScrollArea>
					<button
						class="btn btn-secondary grid min-h-max place-items-center p-0 text-accent md:h-[1.25vw] md:w-[3vw] md:rounded-[0.5vw]"
					>
						<Chevron class="md:size-[1vw]" />
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col p-4 pt-7 md:mb-[1vw] md:mt-[2vw] md:flex md:w-[68vw] md:p-0">
		<div class="flex items-center gap-[0.625vw]">
			<span class="text-lg font-bold md:text-[1.25vw]">{$t("home.my_list.title")}</span>
			<button
				class="btn btn-secondary hidden min-h-full rounded-[0.1875vw] p-0 md:flex md:h-[1.5vw] md:w-[1.5vw]"
			>
				<Settings class="w-[0.9vw] opacity-75" />
			</button>
		</div>
		<div class="flex items-center justify-between">
			<span class="text-surface-50 text-sm md:text-[1vw] md:font-semibold"> 7 animes </span>
			<div class="hidden items-center gap-[1vw] md:flex">
				<button
					class="bg-surface-400 btn btn-neutral h-[2.25vw] min-h-max gap-[0.625vw] rounded-[0.375vw] p-0 text-[0.875vw] font-semibold md:px-[0.5vw]"
				>
					{$t("home.my_list.options.watching")}
					<Chevron class="w-[1vw]" />
				</button>
				<button
					class="bg-surface-400 btn btn-neutral h-[2.25vw] min-h-max gap-[0.625vw] rounded-[0.375vw] p-0 text-[0.875vw] font-semibold md:px-[0.5vw]"
				>
					{$t("home.my_list.cta")}
					<ArrowUpRight class="w-[1vw]" />
				</button>
			</div>
			<div class="md:hidden">
				<button class="btn btn-secondary h-max min-h-max gap-2 p-0 text-sm">
					{$t("home.my_list.cta")}
					<Chevron class="text-primary-400 w-4 -rotate-90" />
				</button>
			</div>
		</div>
		<div class="relative mt-3 grid grid-cols-3 gap-3 md:mt-[1vw] md:grid-cols-5 md:gap-[1.25vw]">
			<!-- <MyAnimeList {my_anime_list} dropdown_class="pl-3" /> -->
		</div>
	</div>
</div>
