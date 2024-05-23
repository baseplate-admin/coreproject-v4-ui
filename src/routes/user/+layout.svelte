<script lang="ts">
	import Refresh from "$icons/shapes/refresh.svelte";
	import CoreProject from "$icons/text/core_project.svelte";
	import * as _ from "lodash-es";
	import { blur } from "svelte/transition";
	import { Timer as EasyTimer } from "easytimer.js";
	import { TIMER_DELAY } from "$constants/timer";

	let { children } = $props();

	let animes = [
		{ name: "Demon Slayer", cover: "/images/mock/DemonSlayer-cover.avif" },
		{ name: "Hyouka", cover: "/images/mock/Hyouka-bg.avif" },
		{ name: "You Lie in April", cover: "/images/mock/YourLieInApril-bg.avif" },
		{ name: "Attack on Titan", cover: "/images/mock/AttackOnTitan-bg.avif" },
		{ name: "Jujutsu Kaisen", cover: "/images/mock/JujutsuKaisen.avif" },
		{ name: "Death Note", cover: "/images/mock/DeathNote-bg.avif" }
	];

	let picked_anime = $state<(typeof animes)[0]>();

	const get_random_anime = () => {
		const array_without_element =
			picked_anime === undefined ? animes : _.without(animes, picked_anime);
		const sample = _.sample(array_without_element);

		if (sample === undefined) {
			get_random_anime();
		} else {
			picked_anime = sample;
		}
	};

	let timer = new EasyTimer({
		target: {
			seconds: TIMER_DELAY
		},
		precision: "secondTenths"
	});

	timer.on("targetAchieved", () => {
		get_random_anime();
		timer.reset();
	});

	$effect(() => {
		if (timer.isRunning()) return;

		get_random_anime();
		timer.start();
	});
</script>

<div class="relative grid h-screen w-screen bg-secondary md:grid-cols-2">
	<div class="relative h-dvh">
		{#if picked_anime}
			<div class="h-dvh">
				{#key picked_anime}
					<img
						transition:blur
						src={picked_anime.cover}
						alt=""
						class="absolute h-full w-full object-cover transition-all"
					/>
				{/key}
				<div class="absolute inset-0 bg-gradient-to-r from-secondary/75 to-secondary/50"></div>
				<backdrop class="absolute inset-0 bg-transparent duration-300"></backdrop>
				<div
					class="absolute inset-0 bottom-[6vw] hidden flex-col items-center justify-center text-center text-white md:flex"
				>
					<span class="text-[0.9vw] font-semibold uppercase leading-none">welcome to</span>
					<CoreProject class="!mt-[0.5vw] !leading-none md:!text-[1.5vw]" />
					<span class="mt-[2.875vw] max-w-[22vw] text-[1.25vw] font-semibold leading-[1.75vw]"
						>Bridging the gap between streaming and torrenting sites with a modern and clean
						interface.</span
					>
					<span class="mt-[4vw] text-[1vw] font-semibold leading-none"
						>With a coreproject account, you can</span
					>
					<span
						class="text-surface-200 mt-[0.5vw] max-w-[22vw] text-[1vw] font-medium leading-[1vw]"
						>continue on animecore, mangacore and soundcore with same account.</span
					>
				</div>
				<div
					class="absolute bottom-[1.85vw] left-[2vw] top-auto hidden flex-col gap-[0.75vw] md:flex"
				>
					<span
						class="text-[0.75vw] font-semibold uppercase leading-none tracking-widest text-white/75"
					>
						Background from anime
					</span>
					<div class="grid">
						{#key picked_anime}
							<div
								transition:blur
								class="col-start-1 row-start-1 flex items-center gap-2 text-[1vw] font-bold uppercase leading-none tracking-widest text-warning"
							>
								{picked_anime.name}
								<button
									onclick={(event) => {
										event.preventDefault();
										get_random_anime();
										timer.reset();
									}}
								>
									<Refresh class="w-[1vw]" />
								</button>
							</div>
						{/key}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div class="absolute inset-x-0 self-end md:static md:self-auto">
		<div class="p-7 pb-5 md:hidden">
			{#if picked_anime}
				<div class="flex flex-col gap-2">
					<span
						class="text-[2.25vw] font-semibold uppercase leading-none tracking-widest text-white/75"
					>
						Background from anime
					</span>
					<div class="grid">
						{#key picked_anime}
							<div
								transition:blur
								class="col-start-1 row-start-1 flex items-center gap-2 text-[3vw] font-bold uppercase leading-none tracking-widest text-warning"
							>
								{picked_anime.name}
								<button
									onclick={(event) => {
										event.preventDefault();
										get_random_anime();
										timer.reset();
									}}
								>
									<Refresh class="w-3" />
								</button>
							</div>
						{/key}
					</div>
				</div>
			{/if}
		</div>
		<div class="size-full bg-secondary p-7 md:p-0 md:px-[8vw] md:py-[2.2vw]">
			{@render children()}
		</div>
	</div>
</div>
