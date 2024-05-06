<script lang="ts">
	import Chevron from '$icons/shapes/chevron.svelte';
	import Settings from '$icons/shapes/settings.svelte';
	import ArrowUpRight from '$icons/shapes/arrow_up_right.svelte';
	import Chat from '$icons/shapes/chat.svelte';
	import Recent from '$icons/shapes/recent.svelte';
	import Notification from '$icons/shapes/notifications.svelte';
	import Language from '$icons/shapes/language.svelte';
	import Preference from '$icons/shapes/preference.svelte';
	import Moon from '$icons/shapes/moon.svelte';
	import CoreProjectText from '$icons/text/core_project_text.svelte';

	import type { LatestAnimes } from '$types/lastest_anime';

	import { swipe } from 'svelte-gestures';
	import { Timer as EasyTimer } from 'easytimer.js';
	import { tweened, type Tweened } from 'svelte/motion';
	import { FormatDate } from '$functions/format_date';
	import { blur } from 'svelte/transition';
	import Circle from '$icons/shapes/circle.svelte';
	import Play from '$icons/shapes/play.svelte';
	import Info from '$icons/shapes/info.svelte';
	import Edit from '$icons/shapes/edit.svelte';

	import ScrollArea from '$components/scroll_area.svelte';
	import { cn } from '$functions/classnames';

	const slider_delay = 10,
		timer = new EasyTimer({
			target: {
				seconds: slider_delay
			},
			precision: 'secondTenths'
		}),
		slide_buttons = [
			{ background: 'bg-accent', border: 'border-accent' },
			{ background: 'bg-info', border: 'border-info' },
			{ background: 'bg-warning', border: 'border-warning' },
			{ background: 'bg-white', border: 'border-white' },
			{ background: 'bg-primary', border: 'border-primary' },
			{ background: 'bg-error', border: 'border-error' }
		];

	let latest_animes: LatestAnimes[] = [
		{
			id: 1,
			name: 'Jujutsu Kaisen',
			type: 'TV',
			episodes: 24,
			status: 'Completed',
			release_date: 'Autumn 2014',
			studio: 'mappa',
			genres: ['sci-fi', 'action', 'echhi'],
			synopsis: `Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the "King of Curses.`,
			image: 'https://staticg.sportskeeda.com/editor/2023/04/95453-16812287437122-1920.jpg?w=840'
		},
		{
			id: 2,
			name: 'One Piece',
			type: 'TV',
			episodes: 12,
			status: 'Completed',
			release_date: 'Spring 2014',
			studio: 'tokito',
			genres: ['hentai', 'action', 'romance', 'smooth'],
			synopsis: `Since the premiere of the anime adaptation of Eiichiro Oda's One Piece manga in 1999, Toei Animation has produced 15 feature films based on the franchise traditionally released during the Japanese school spring break since 2000.[1] Four of the films were originally shown as double features alongside other Toei film productions and thus have a running time below feature length (between 30 and 56 minutes). The first three films were shown at the Toei Anime Fair (東映アニメフェア, Toei Anime Fea) and the eleventh was released as part of Jump Heroes Film. The films generally use original storylines, but some adapt story arcs from the manga directly. With the release of films ten, twelve, thirteen, and fourteen, tie-in story arcs of the TV series were aired concurrently. `,
			image: 'https://bg-so-1.zippyimage.com/2021/05/29/bcb474d59354a3d20036490aa807fc77.png'
		},
		{
			id: 3,
			name: 'Demon Slayer',
			type: 'TV',
			episodes: 12,
			status: 'Completed',
			release_date: 'Winter 2014',
			studio: 'sheldon',
			genres: ['hentai', 'action', 'romance', 'smooth'],
			synopsis: `Since the premiere of the anime adaptation of Eiichiro Oda's One Piece manga in 1999, Toei Animation has produced 15 feature films based on the franchise traditionally released during the Japanese school spring break since 2000.[1] Four of the films were originally shown as double features alongside other Toei film productions and thus have a running time below feature length (between 30 and 56 minutes). The first three films were shown at the Toei Anime Fair (東映アニメフェア, Toei Anime Fea) and the eleventh was released as part of Jump Heroes Film. The films generally use original storylines, but some adapt story arcs from the manga directly. With the release of films ten, twelve, thirteen, and fourteen, tie-in story arcs of the TV series were aired concurrently. `,
			image:
				'https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/03/demon-slayer-banner.jpg'
		}
	];

	let main_hero_slider_element: HTMLElement,
		main_hero_slide_active_index = $state<number>(0);

	const add_one_to_main_hero_slide_active_index = () => {
			if (main_hero_slide_active_index + 1 === latest_animes.length) {
				main_hero_slide_active_index = 0;
				return;
			}
			main_hero_slide_active_index += 1;
		},
		minus_one_to_main_hero_slide_active_index = () => {
			if (main_hero_slide_active_index === 0) {
				main_hero_slide_active_index = latest_animes.length - 1;
				return;
			}
			main_hero_slide_active_index -= 1;
		},
		swipe_handler = (event: CustomEvent) => {
			const direction = event.detail.direction;
			timer.reset();

			if (direction === 'left') {
				add_one_to_main_hero_slide_active_index();
			} else if (direction === 'right') {
				minus_one_to_main_hero_slide_active_index();
			}
		};
	let progress_value = $state<number>(0),
		tweened_progress_value = $state<Tweened<number>>(tweened<number>());
	$effect(() => {
		tweened_progress_value.set(progress_value);
	});

	timer.start();
	timer.on('targetAchieved', () => {
		// change slider
		add_one_to_main_hero_slide_active_index();
		timer.reset();
	});

	timer.on('secondTenthsUpdated', () => {
		const time = timer.getTotalTimeValues().secondTenths,
			value = (100 / slider_delay) * (time / 10);

		progress_value = value;
	});
</script>

<div class="mt-16 block md:mt-0 md:p-[1.25vw] md:pr-[3.75vw]">
	<div class="flex flex-col justify-between md:flex-row">
		<!-- LATEST ANIME SECTION-->

		<!-- svelte-ignore deprecated_event_handler -->
		<div
			class="relative h-96 w-full md:h-[27.875vw] md:w-[42.1875vw]"
			use:swipe={{ timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-y' }}
			onswipe={swipe_handler}
			bind:this={main_hero_slider_element}
		>
			{#each latest_animes as anime, index}
				{@const active = index === main_hero_slide_active_index}
				{@const formated_aired_on = new FormatDate(anime.release_date).format_to_season}

				{#if active}
					<div
						role="presentation"
						class="absolute inset-0 md:bottom-[2vw]"
						transition:blur
						onmouseenter={() => {
							timer?.pause();
						}}
						onmouseleave={() => {
							timer?.start();
						}}
						ontouchstart={() => {
							timer?.pause();
						}}
						ontouchend={() => {
							timer?.start();
						}}
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
							class="absolute flex flex-col bottom-0 md:left-0 p-4 md:px-[3.75vw] md:py-[2.625vw]"
						>
							<span class="text-3xl font-bold text-white md:text-[2vw] md:leading-[2.375vw]"
								>{anime.name}</span
							>
							<div
								class="flex flex-wrap items-center gap-2 py-2 text-xs font-semibold text-white/90 md:gap-[0.65vw] md:pb-0 md:pt-[0.5vw] md:text-[0.9375vw]"
							>
								<span class="leading-[1.125vw]">
									{anime.type}
								</span>
								<Circle class="w-1 opacity-75 md:w-[0.25vw]" />
								<span class="leading-[1.125vw]">
									{anime.episodes} eps
								</span>
								<Circle class="w-1 opacity-75 md:w-[0.25vw]" />
								<span class="leading-[1.125vw]">Completed</span>
								<Circle class="w-1 opacity-75 md:w-[0.25vw]" />
								<span class="capitalize leading-[1.125vw]">
									{formated_aired_on}
								</span>
								<Circle class="w-1 opacity-75 md:w-[0.25vw]" />
								<span class="leading-[1.125vw]">
									{anime.studio}
								</span>
								<div>
									<anime-genres class="flex gap-2 pb-2 pt-3 md:gap-[0.5vw] md:pt-0">
										{#each anime.genres as genre}
											<span
												class="rounded-lg bg-secondary p-2 px-3 text-xs capitalize leading-none md:rounded-[0.35vw] md:px-[0.75vw] md:py-[0.4vw] md:text-[0.75vw] md:font-semibold"
											>
												{genre}
											</span>
										{/each}
									</anime-genres>

									<ScrollArea
										gradient_mask
										offset_scrollbar
										parent_class="max-h-16 md:max-h-[6vw] hidden md:flex"
										class="text-surface-200 text-xs font-medium leading-4 md:pt-[0.75vw] md:text-[0.85vw] md:leading-[1.1vw]"
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
					{#each latest_animes as _, index}
						<button
							class={cn(
								'col-span-1 h-[0.625vw] w-full rounded-[0.1875vw] border-[0.15vw]',
								slide_buttons[index].border,
								'hover:border-surface-50/50 transition duration-300',
								index === main_hero_slide_active_index && slide_buttons[index].background
							)}
							onclick={() => {
								timer?.reset();
								timer?.start();
								main_hero_slide_active_index = index;
							}}
						></button>
					{/each}
				</div>
			</div>

			<button
				class="btn btn-primary absolute -left-[1vw] top-[12vw] z-20 hidden h-[2.25vw] min-h-max w-[2.25vw] rounded-[0.375vw] p-0 text-accent md:flex"
				onclick={() => {
					timer?.reset();
					timer?.start();
					minus_one_to_main_hero_slide_active_index();
				}}
			>
				<Chevron class="w-[1.25vw] rotate-90" />
			</button>
			<button
				class="bg-secondary-800 btn btn-primary absolute -right-[1vw] top-[12vw] z-20 hidden h-[2.25vw] min-h-max w-[2.25vw] rounded-[0.375vw] p-0 text-accent md:flex"
				onclick={async () => {
					timer?.reset();
					timer?.start();
					add_one_to_main_hero_slide_active_index();
				}}
			>
				<Chevron class="w-[1.25vw] -rotate-90" />
			</button>
		</div>

		<!-- LATEST ANIME SECTION ENDS HERE -->
		<div class="hidden w-[21.5625vw] md:block">
			<div class="flex items-center justify-between pr-[0.75vw]">
				<div class="flex items-center gap-[0.625vw]">
					<span class="text-[1.25vw] font-bold">Latest Episodes</span>
					<button
						class="btn btn-secondary hidden min-h-full rounded-[0.1875vw] p-0 md:flex md:h-[1.5vw] md:w-[1.5vw]"
					>
						<Settings class="w-[0.9vw] opacity-75" />
					</button>
				</div>
				<button
					class="btn btn-neutral min-h-max rounded-[0.3vw] p-0 text-[0.9vw] font-semibold md:h-[2vw] md:px-[0.5vw]"
				>
					<span>Full List</span>
					<ArrowUpRight class="w-[1vw]" />
				</button>
			</div>
			<!-- Latest Episodes Start here-->

			<!-- Latest Episodes Eng Here -->
			<div class="mt-[0.75vw] flex items-center justify-between gap-[2vw] pr-[0.75vw]">
				<span class="text-[0.75vw] font-semibold md:leading-[1.25vw]"
					>Showing recently aired episodes from your Anime List</span
				>
				<button
					class="btn btn-secondary min-h-full h-max p-0 text-[0.75vw] font-semibold text-warning"
					>Change to All</button
				>
			</div>
		</div>
		<div class="relative mt-[2.75vw] hidden h-[24.5vw] w-[16.625vw] md:block">
			<div class="absolute h-full w-full rounded-[0.875vw] object-cover object-center">
				<img
					class="absolute h-full w-full rounded-[0.875vw] object-cover object-center"
					src="https://i.pinimg.com/originals/b7/25/12/b725125aaebafbcbf2fb3886a55d2d6f.jpg"
					alt=""
					loading="lazy"
				/>
			</div>
			<div class="absolute inset-0 bg-gradient-to-t from-secondary from-[1%] to-secondary/25"></div>
			<div class="absolute inset-0 bg-gradient-to-r from-secondary/50 to-secondary/25"></div>
			<div class="absolute inset-0 flex flex-col justify-between px-[1.875vw] pt-[2vw] text-accent">
				<div class="flex flex-col gap-[0.2w]">
					<span class="text-[1.5vw] font-bold leading-[1vw]">Welcome</span>
					<span class="text-[0.875vw] font-semibold leading-[2.5vw]">Jump quickly into</span>
				</div>
				<div class="mt-[1vw] flex flex-col gap-[0.75vw]">
					<div class="flex items-center gap-[1vw]">
						<button class="btn btn-warning h-[2.5vw] min-h-max w-[2.5vw] rounded-[0.375vw] p-0">
							<Chat class="text-surface-900 w-[1.25vw]" />
						</button>
						<span class="text-[1vw] font-bold">Forums</span>
					</div>
					<div class="flex items-center gap-[1vw]">
						<button
							class="bg-surface-50 btn btn-warning h-[2.5vw] min-h-max w-[2.5vw] rounded-[0.375vw] p-0"
						>
							<Recent class="text-surface-900 w-[1.25vw]" />
						</button>
						<span class="text-[1vw] font-bold">Last watched anime</span>
					</div>
					<div class="flex items-center gap-[1vw]">
						<button
							class="bg-surface-50 btn btn-warning h-[2.5vw] min-h-max w-[2.5vw] rounded-[0.375vw] p-0"
						>
							<Notification class="text-surface-900 w-[1.25vw]" />
						</button>
						<span class="text-[1vw] font-bold">Notifications</span>
					</div>
				</div>
				<div class="mt-[0.4vw]">
					<span class="text-[0.9vw] font-semibold leading-none">More</span>
					<div class="mt-[0.75vw] flex gap-[0.9375vw]">
						<button class="btn btn-accent h-[2.5vw] min-h-max w-[2.5vw] rounded-[0.375vw] p-0">
							<Language class="text-surface-900 w-[1.25vw]" />
						</button>
						<button class="btn btn-accent h-[2.5vw] min-h-max w-[2.5vw] rounded-[0.375vw] p-0">
							<Preference class="text-surface-900 w-[1.25vw]" />
						</button>
						<button class="btn btn-accent h-[2.5vw] min-h-max w-[2.5vw] rounded-[0.375vw] p-0">
							<Moon class="text-surface-900 w-[1.25vw]" />
						</button>
						<button
							class="bg-surface-50 btn btn-accent h-[2.5vw] min-h-max w-[2.5vw] rounded-[0.375vw] p-0"
						>
							<Settings class="text-surface-900 w-[1.25vw]" />
						</button>
					</div>
				</div>
				<CoreProjectText />
			</div>
		</div>
	</div>
	<div class="flex flex-col p-4 pt-7 md:mb-[1vw] md:mt-[2.1875vw] md:flex md:w-[68vw] md:p-0">
		<div class="flex items-center gap-[0.625vw]">
			<span class="text-lg font-bold md:text-[1.25vw]">My List</span>
			<button
				class="btn btn-secondary hidden min-h-full rounded-[0.1875vw] p-0 md:flex md:h-[1.5vw] md:w-[1.5vw]"
			>
				<Settings class="w-[0.9vw] opacity-75" />
			</button>
		</div>
		<div class="flex items-center justify-between">
			<span class="text-surface-50 text-sm md:text-[1vw] md:font-semibold">7 anime in Watching</span
			>
			<div class="hidden items-center gap-[1vw] md:flex">
				<button
					class="bg-surface-400 btn btn-neutral h-[2.25vw] min-h-max w-[6.625vw] gap-[0.625vw] rounded-[0.375vw] p-0 text-[0.875vw] font-semibold"
				>
					Watching
					<Chevron class="w-[1vw]" />
				</button>
				<button
					class="bg-surface-400 btn btn-neutral h-[2.25vw] min-h-max w-[5.625vw] gap-[0.625vw] rounded-[0.375vw] p-0 text-[0.875vw] font-semibold"
				>
					Full List
					<ArrowUpRight class="w-[1vw]" />
				</button>
			</div>
			<div class="md:hidden">
				<button class="btn btn-secondary h-max min-h-max gap-2 p-0 text-sm">
					See all
					<Chevron class="text-primary-400 w-4 -rotate-90" />
				</button>
			</div>
		</div>
		<div class="relative mt-3 grid grid-cols-3 gap-3 md:mt-[1vw] md:grid-cols-5 md:gap-[1.25vw]">
			<!-- <MyAnimeList {my_anime_list} dropdown_class="pl-3" /> -->
		</div>
	</div>
</div>
