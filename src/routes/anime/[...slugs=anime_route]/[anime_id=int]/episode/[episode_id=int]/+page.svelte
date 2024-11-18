<script lang="ts">
	import { page } from "$app/stores";
	import Portal from "svelte-portal";
	import { blur } from "svelte/transition";

	type PlayerOptions = {
		lights: boolean;
	};

	// NOTE: remove after backend implemntation
	const EPISODES_LENGTH = 34;

	let options = $state<PlayerOptions>({
		lights: false
	});
	let player_container_el: HTMLDivElement;

	function handle_lights_toggle() {
		options.lights = !options.lights;
	}
</script>

{#if options.lights}
	<Portal>
		<div
			transition:blur
			tabindex="0"
			role="button"
			onmousedown={handle_lights_toggle}
			class="absolute inset-0 z-10 bg-secondary/95"
		></div>
	</Portal>
{/if}

<div class="mt-16 flex flex-col md:mt-0 md:gap-[3.5vw] md:py-[2vw] md:pl-[1vw] md:pr-[3.75vw]">
	<div class="grid grid-cols-12 md:gap-[5vw]">
		<div
			class="relative col-span-12 flex flex-col md:col-span-8 md:gap-[1vw]"
			class:z-50={options.lights}
		>
			<div class="h-64 w-full md:z-30 md:h-[35vw]">
				<div
					bind:this={player_container_el}
					class="h-full w-full rounded-none object-cover md:rounded-[1vw]"
				>
					<img
						class="h-full w-full rounded-none object-cover md:rounded-[1vw]"
						src="/images/mock/banner/one_piece.avif"
						alt="Episode"
						loading="lazy"
					/>
				</div>
			</div>
			<div
				class="flex flex-col gap-2 px-5 pt-5 transition duration-500 md:flex-row md:items-center md:justify-between md:gap-0 md:p-0"
				class:opacity-50={options.lights}
			>
				<div class="flex gap-2 md:items-center md:gap-[1vw]">
					<div class="flex items-center gap-2 md:gap-[0.75vw]">
						<span class="text-xs font-semibold uppercase text-info md:text-[1vw]">sub/dub:</span>
						<button
							class="btn flex h-max min-h-full items-center gap-2 rounded-[0.35vw] !bg-transparent p-0 text-xs leading-none text-warning md:gap-[0.5vw] md:text-[1vw]"
						>
							Vidstreaming (sub)
							<coreicons-shape-chevron variant="down" class="size-3 md:size-[1vw]"
							></coreicons-shape-chevron>
						</button>
					</div>
					<button
						onclick={handle_lights_toggle}
						class="btn hidden h-max min-h-full items-center !bg-transparent p-0 text-xs leading-none md:flex md:text-[0.9vw]"
					>
						<span class="text-info">Lights:</span>
						<div class="text-primary-300 font-semibold" class:text-warning={options.lights}>
							{options.lights ? "On" : "Off"}
						</div>
					</button>
				</div>
			</div>
		</div>
		<div class="col-span-12 flex flex-col gap-3 p-5 md:col-span-4 md:gap-[0.5vw] md:p-0">
			<header class="flex items-center justify-between">
				<span class="text-lg font-semibold text-info md:text-[1.35vw]">Episodes</span>
				<button
					class="btn flex h-max min-h-max items-center gap-2 rounded !bg-transparent px-3 py-2 text-xs font-semibold leading-none md:gap-[0.5vw] md:rounded-[0.35vw] md:px-[0.75vw] md:py-[0.5vw] md:text-[1vw]"
				>
					Eps: 1 - {EPISODES_LENGTH}
					<coreicons-shape-chevron variant="down" class="w-3 md:w-[1vw]"
					></coreicons-shape-chevron>
				</button>
			</header>
			<div class="grid flex-1 grid-cols-7 gap-3 md:grid-cols-6 md:gap-[0.75vw]">
				{#each { length: EPISODES_LENGTH } as _, index}
					{@const idx_number = index + 1}
					{@const is_active = Number($page.params.episode_id) === idx_number}
					<a
						title="Episode name"
						href="./{idx_number}"
						class="btn btn-neutral h-10 min-h-max rounded-xl border-none text-sm font-semibold leading-none text-accent md:h-auto md:rounded-[0.75vw] md:text-[1.2vw]"
						class:!bg-primary={is_active}
					>
						{idx_number}
					</a>
				{/each}
				<a
					aria-label="prev anime"
					href="./{Number($page.params.episode_id) - 1}"
					class="btn btn-error col-start-1 h-10 min-h-max rounded-xl border-none text-sm font-semibold leading-none text-accent md:col-start-5 md:h-auto md:rounded-[0.75vw] md:text-[1.2vw]"
				>
					<coreicons-shape-chevrons variant="left" class="w-4 md:w-[1.4vw]"
					></coreicons-shape-chevrons>
				</a>
				<a
					aria-label="next anime"
					href="./{Number($page.params.episode_id) + 1}"
					class="btn btn-error col-start-7 h-10 min-h-max rounded-xl border-none text-sm font-semibold leading-none text-accent md:col-start-6 md:h-auto md:rounded-[0.75vw] md:text-[1.2vw]"
				>
					<coreicons-shape-chevrons variant="right" class="w-4 md:w-[1.4vw]"
					></coreicons-shape-chevrons>
				</a>
				<div class="col-span-full hidden flex-col md:mt-[1vw] md:flex md:gap-[1vw]">
					<span class="font-semibold uppercase md:text-[1.1vw]">next episode</span>
					<a
						href="/anime/mal/1/episode/{Number($page.params.episode_id) + 1}"
						class="flex md:gap-[1.5vw]"
					>
						<div class="relative">
							<img
								class="md:w-[12vw] md:rounded-[1vw]"
								src="/images/mock/banner/jjk.jpg"
								alt=""
								loading="lazy"
							/>
							<overlay class="absolute inset-0 flex items-center justify-center bg-secondary/50">
								<button
									aria-label="next anime play btn"
									class="btn btn-warning h-max min-h-max rounded-full md:p-[0.75vw]"
								>
									<coreicons-shape-play class="text-secondary md:w-[1.25vw]"
									></coreicons-shape-play>
								</button>
							</overlay>
						</div>
						<div
							class="flex h-max flex-col justify-between self-center leading-none md:gap-[0.5vw]"
						>
							<span class="font-semibold text-warning md:text-[1.1vw]">Finally they met</span>
							<span class="md:text-[1vw]"
								>Episode - <strong>{Number($page.params.episode_id) + 1}</strong></span
							>
							<span class="md:text-[1vw]">23 min</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="flex gap-5 p-5 md:gap-[5vw] md:p-0">
		<div class="flex w-full flex-col gap-2 md:gap-[1vw]">
			<div class="flex items-center justify-between">
				<div>
					<a
						href="/anime/mal/{$page.params.anime_id}"
						class="flex flex-col gap-2 text-lg leading-none md:gap-[0.5vw] md:text-[1.1vw]"
					>
						<span class="font-semibold uppercase leading-none text-accent">Demon Slayer S1</span>
						<span class="text-base leading-none md:text-[1vw]">Kimetsu no yaiba</span>
					</a>
				</div>
				<button
					aria-label="anime share btn"
					class="btn h-max min-h-max border-none bg-transparent p-0"
				>
					<coreicons-shape-share class="w-4 md:w-[1.25vw]"></coreicons-shape-share>
				</button>
			</div>
			<details class="collapse rounded-none" open>
				<summary
					class="collapse-title !list-item h-max min-h-max p-0 text-base font-semibold text-warning md:text-[1.25vw]"
				>
					EP: {$page.params.episode_id} Monotone/Colorful
				</summary>
				<div
					class="collapse-content mt-4 p-0 text-sm leading-snug md:mt-[1vw] md:text-[1vw] md:leading-[1.35vw]"
				>
					<p>
						The autumn he was twelve, piano prodigy Kousei Arima suddenly found himself unable to
						play the piano after his mother's death. Ever since then, it's like he's been frozen in
						time. His childhood friend, Tsubaki Sawabe, watches over him with concern; one day, she
						invites him on a double date. Kousei's other childhood friend, Ryouta Watari, is being
						introduced to a certain girl. Kousei reluctantly heads over to the rendezvous spot.
						There, he sees a girl playing a melodica. This girl, who allegedly has a crush on
						Watari, is Kaori Miyazono. And she turns out to be a violinist!
					</p>
				</div>
			</details>
		</div>
	</div>
	<div class="grid grid-cols-12 p-5 md:gap-[5vw] md:p-0">
		<div class="col-span-12 flex flex-col gap-2 md:col-span-8 md:gap-[0.75vw]">
			<span
				class="flex gap-2 border-b-2 border-neutral pb-1 text-lg font-semibold text-info md:gap-[0.75vw] md:border-none md:pb-0 md:text-[1.25vw] md:leading-[1.5vw]"
				>Comments</span
			>
			<div class="flex items-center justify-between md:hidden">
				<p class="flex items-center gap-1">
					<span class="text-base font-bold leading-none">69</span>
					<span class="text-sm font-semibold">comments</span>
				</p>
				<button
					class="btn btn-square btn-neutral size-7 min-h-full font-semibold md:ml-0 md:size-[2.25vw] md:rounded-[0.75vw] md:p-0 md:leading-[0.9vw]"
					aria-label="Filter"
				>
					<coreicons-shape-filter class="w-3 md:w-[1vw]"></coreicons-shape-filter>
				</button>
			</div>
			<!-- <CommentBox />
			<Comment api_url="" /> -->
		</div>
		<div class="col-span-12 mt-10 flex flex-col gap-5 md:col-span-4 md:mt-0 md:gap-[2vw]">
			<div>
				<div
					class="flex gap-2 border-b-2 border-neutral pb-1 md:gap-[0.75vw] md:border-none md:pb-0"
				>
					<h3 class="text-base font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">
						Forum Posts
					</h3>
					<button
						aria-label="forum settings"
						class="btn btn-neutral hidden min-h-full p-0 md:flex md:h-[1.5vw] md:w-[1.5vw] md:rounded-[0.5vw]"
					>
						<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
						></coreicons-shape-settings>
					</button>
				</div>
				<div class="mt-2 flex items-center justify-between md:mt-[0.75vw]">
					<p class="flex items-center gap-1 md:hidden">
						<span class="text-base font-bold leading-none">106</span>
						<span class="text-sm font-semibold">posts</span>
					</p>
					<div class="flex items-center gap-2 md:w-full md:justify-between">
						<button
							class="btn btn-neutral h-7 min-h-full gap-2 px-2 text-xs font-semibold md:h-[2.25vw] md:rounded-[0.75vw] md:px-[0.9vw] md:text-[0.875vw]"
						>
							<coreicons-shape-plus variant="no-border" class="w-4 md:w-[1vw]"
							></coreicons-shape-plus>
							Create New
						</button>
						<button
							class="btn btn-square btn-neutral size-7 min-h-full font-semibold md:ml-0 md:size-[2.25vw] md:rounded-[0.75vw] md:p-0 md:leading-[0.9vw]"
							aria-label="Filter"
						>
							<coreicons-shape-filter class="w-3 md:w-[1vw]"></coreicons-shape-filter>
						</button>
					</div>
				</div>
				<div class="mt-4 grid grid-cols-2 flex-col gap-4 md:mt-[1.25vw] md:flex md:gap-[1vw]">
					<a
						href="/"
						class="card w-full grid-cols-7 overflow-hidden rounded-xl !bg-neutral/50 md:grid md:rounded-[1vw]"
					>
						<div class="col-span-2 block h-16 md:h-full md:w-full">
							<img
								src="https://timelinecovers.pro/facebook-cover/download/anime-your-lie-in-april-kaori-and-arima-facebook-cover.jpg"
								alt=""
								class="h-full w-full object-cover object-center"
							/>
						</div>
						<div
							class="flex h-36 flex-col justify-between p-3 md:col-span-5 md:h-full md:gap-[0.375vw] md:p-[1vw]"
						>
							<div>
								<div
									class="line-clamp-2 text-xs font-extrabold md:text-[0.875vw] md:leading-[1.25vw]"
								>
									Celebrating 10 years of Hyouka!
								</div>
								<div
									class="mt-2 line-clamp-3 text-[0.6rem] font-medium leading-snug md:mt-[0.5vw] md:line-clamp-2 md:text-[0.75vw] md:leading-[1.125vw]"
								>
									Ousei Arima is a child prodigy known as the "Human Metronome" for playing the
									piano with precision and perfection. Guided by a strict mother and rigorous
									training, Kousei dominates every competition he enters
								</div>
							</div>
							<div
								class="flex items-end justify-between text-[0.6rem] leading-none md:mt-[0.75vw] md:items-center md:text-[0.75vw]"
							>
								<div class="flex flex-col gap-1 md:flex-row md:items-center md:gap-[0.25vw]">
									<div>
										Posted by <span class="text-[0.65rem] font-semibold md:text-[0.85vw]"
											>Eiennlaio</span
										>
									</div>
									<div>7 months ago</div>
								</div>
								<div class="flex items-center gap-1 md:gap-[0.25vw]">
									<coreicons-shape-message-circle class="w-3 md:w-[1vw]"
									></coreicons-shape-message-circle>
									<div>69</div>
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
			<div>
				<div
					class="flex gap-2 border-b-2 border-neutral pb-1 md:gap-[0.75vw] md:border-none md:pb-0"
				>
					<h3 class="text-base font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">
						Recommendations
					</h3>
					<button
						aria-label="Recommendations"
						class="btn btn-neutral hidden min-h-full p-0 md:flex md:h-[1.5vw] md:w-[1.5vw] md:rounded-[0.5vw]"
					>
						<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
						></coreicons-shape-settings>
					</button>
				</div>
				<div class="mt-3 grid grid-cols-3 gap-4 md:mt-[1.25vw] md:grid-cols-3 md:gap-[1vw]">
					{#each { length: 3 } as _}
						<a href="/myanimelist/38000" class="card relative col-span-1 h-44 w-full md:h-[12vw]">
							<img
								class="h-full w-full rounded-xl object-cover object-center md:rounded-[1vw]"
								src="/images/mock/cover/jjk.webp"
								alt=""
								loading="lazy"
							/>
							<div
								class="absolute bottom-3 z-10 flex w-full flex-col items-center gap-1 px-[0.5vw] text-center md:bottom-[1vw] md:gap-[0.25vw]"
							>
								<div
									class="text-sm font-semibold leading-snug text-white duration-500 ease-in-out md:h-auto md:max-h-[2.5vw] md:overflow-hidden md:text-[1vw] md:leading-[1.25vw] md:hover:max-h-[7vw] md:hover:overflow-y-scroll md:hover:scrollbar-thin"
								>
									Demon Slayer: Kimetsu no Yaiba
								</div>
								<div class="text-xs leading-none md:text-[0.9vw]">鬼滅の刃</div>
								<div
									class="text-xs leading-none duration-500 ease-in-out md:h-auto md:max-h-[2.5vw] md:overflow-hidden md:text-[0.9vw] md:hover:max-h-[7vw] md:hover:overflow-y-scroll md:hover:scrollbar-thin"
								>
									Episodes: <b>12</b>
								</div>
							</div>
							<div
								class="gradient absolute inset-0 bg-gradient-to-t from-secondary/90 to-secondary/25"
							></div>
						</a>
					{/each}
				</div>
				<div class="mt-3 flex w-full justify-center md:mt-[1vw]">
					<button
						class="btn btn-neutral h-7 min-h-full gap-2 px-3 text-xs font-semibold md:h-[2.25vw] md:rounded-[0.75vw] md:px-[0.9vw] md:text-[0.875vw]"
					>
						Load more
						<coreicons-shape-chevron variant="down" class="w-4 md:w-[1vw]"
						></coreicons-shape-chevron>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
