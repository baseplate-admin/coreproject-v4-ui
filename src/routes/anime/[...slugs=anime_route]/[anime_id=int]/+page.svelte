<script lang="ts">
	// Components
	import HoverExpand from "$components/hover_expand.svelte";
	import ScrollArea from "$components/scroll_area.svelte";
	import DominantColor from "$components/dominant_color/index.svelte";

	import { page } from "$app/stores";

	let anime_name = "Your Lie in April",
		anime_japanese_name = "四月は君の嘘",
		anime_synopsis =
			"Kousei Arima is a child prodigy known as the \"Human Metronome\"for playing the piano with precision and perfection. Guided by a strict mother and rigorous training, Kousei dominates every competition he enters, earning the admiration of his musical peers and praise from audiences. When his mother suddenly passes away, the subsequent trauma makes him unable to hear the sound of a piano, and he never takes the stage thereafter.\r\n\r\nNowadays, Kousei lives a quiet and unassuming life as a junior high school student alongside his friends Tsubaki Sawabe and Ryouta Watari. While struggling to get over his mother's death, he continues to cling to music. His monochrome life turns upside down the day he encounters the eccentric violinist Kaori Miyazono, who thrusts him back into the spotlight as her accompanist. Through a little lie, these two young musicians grow closer together as Kaori tries to fill Kousei's world with color.",
		anime_image = "/images/YourLieInApril-bg.avif",
		anime_episode_mapping = [
			{
				banner: "https://theglorioblog.files.wordpress.com/2014/11/april4b.png",
				name: "The Revival of the Long-established Classic Literature Club. The Descendants of the Classic Literature Club",
				japanese_name:
					"老舗古典部復活 カッコいいですよね 栄光の古典文学クラブの昔 古典文学部の活動",
				duration: "20:54",
				formats: ["sub", "dub"],
				resolutions: ["sd", "hd", "fhd"]
			},
			{
				banner: "https://theglorioblog.files.wordpress.com/2014/11/april4b.png",
				name: "The Revival of the Long-established Classic Literature Club. The Descendants of the Classic Literature Club",
				japanese_name:
					"老舗古典部復活 カッコいいですよね 栄光の古典文学クラブの昔 古典文学部の活動",
				duration: "20:54",
				formats: ["sub", "dub"],
				resolutions: ["sd", "hd", "fhd"]
			},
			{
				banner: "https://theglorioblog.files.wordpress.com/2014/11/april4b.png",
				name: "The Revival of the Long-established Classic Literature Club. The Descendants of the Classic Literature Club",
				japanese_name:
					"老舗古典部復活 カッコいいですよね 栄光の古典文学クラブの昔 古典文学部の活動",
				duration: "20:54",
				formats: ["sub", "dub"],
				resolutions: ["sd", "hd", "fhd"]
			}
		];

	let dominant_color = "";
	let anime_episodes_count = 0;

	// Internal logics
	const second_mapping = [
		// anime.source
		{ item: "TV" },
		// anime.episode
		{ item: `${anime_episodes_count} eps` },
		// anime.status
		{ item: `completed` },
		// anime.aired_from
		{ item: `spring 2023` },
		// anime.aired_to
		{ item: `Kuschio animation` }
	];
	const button_mapping: {
		icon: string;
		label: string;
		variant?: string;
	}[] = [
		{
			icon: `<coreicons-shape-edit class="w-4 md:w-[1.125vw]"variant='line-with-pencil'></coreicons-shape-edit>`,
			label: "edit"
		},
		{
			icon: `<coreicons-shape-download variant='arrow' class="w-4 md:w-[1.125vw]"></coreicons-shape-download>`,
			label: "download"
		},
		{
			icon: `<coreicons-shape-share class="w-4 md:w-[1.125vw]"></coreicons-shape-share>`,
			label: "share"
		}
	];
</script>

<div class="relative mt-16 block h-screen bg-cover md:mt-0">
	<img
		src="https://files.otakustudy.com/wp-content/uploads/2020/10/10153058/your-lie-in-april-cover.jpg"
		class="absolute hidden h-full w-full select-none object-cover object-center md:flex"
		alt={anime_name}
	/>
	<div class="gradient absolute inset-0 bg-gradient-to-t from-secondary to-secondary/80"></div>
	<div class="absolute inset-0 grid grid-cols-12 items-start p-5 pt-10 md:p-[5vw]">
		<div class="col-span-12 md:col-span-10 md:pr-[4vw]">
			<div class="grid grid-cols-12 items-end justify-between">
				<div
					class="relative col-span-12 grid grid-cols-12 gap-5 md:col-span-7 md:flex md:w-full md:items-end md:gap-[2vw] md:pr-[2vw]"
				>
					<div class="relative col-span-12 h-96 md:h-[18.25vw] md:w-[13vw] md:flex-shrink-0">
						<img
							alt={anime_name}
							src={anime_image}
							class="h-full w-full rounded-xl object-cover object-center md:rounded-[1vw]"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-secondary/75 md:hidden"></div>
						<div
							class="gradient absolute inset-0 bg-gradient-to-r from-secondary/50 to-transparent md:hidden"
						></div>
					</div>
					<div class="absolute bottom-0 col-span-12 p-5 md:static md:p-0">
						<HoverExpand
							class="w-full text-2xl font-bold text-accent md:text-[2vw] md:leading-[2.7vw]"
							height="max-h-48 md:max-h-[10vw]"
						>
							{anime_name}
						</HoverExpand>
						<HoverExpand
							class="w-full pt-2 text-xs font-semibold uppercase tracking-wider md:gap-x-[0.25vw] md:pt-[0.625vw] md:text-[0.75vw] md:leading-[0.9vw]"
						>
							{anime_japanese_name}
						</HoverExpand>
						<div
							class="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold md:mt-[0.25vw] md:gap-[0.5vw] md:pt-[0.5vw] md:text-[0.75vw] md:leading-[0.75vw]"
						>
							{#each second_mapping as map}
								<span>{map.item}</span>
								{#if second_mapping.at(-1) !== map}
									<coreicons-shape-circle
										variant="filled"
										class="size-1 opacity-75 md:size-[0.35vw]"
									></coreicons-shape-circle>
								{/if}
							{/each}
						</div>
						<div class="mt-3 flex items-center gap-3 md:mt-[1.5vw] md:gap-[0.75vw]">
							<button
								type="button"
								class="w-26 btn btn-primary h-14 rounded-xl font-bold text-accent md:h-[4vw] md:w-[7.5vw] md:gap-[0.5vw] md:rounded-[0.75vw]"
							>
								<coreicons-shape-play class="size-5 md:size-[1.5vw]"></coreicons-shape-play>

								<div class="flex flex-col items-start gap-0.5 md:gap-[0.25vw]">
									<span class="text-sm leading-none md:text-[0.9vw]">Watch</span>
									<span class="text-xs font-semibold leading-none md:text-[0.75vw]">Ep 01</span>
								</div>
							</button>
							<button
								disabled
								type="button"
								class="btn size-14 gap-0 rounded-xl bg-secondary capitalize md:h-[4vw] md:w-[4vw] md:gap-0 md:rounded-[0.75vw] md:text-[0.87vw] md:font-semibold"
							>
								<coreicons-shape-book variant="open" class="w-4 md:size-[1.5vw]"
								></coreicons-shape-book>
								<span class="leading-none">read</span>
							</button>
						</div>
						<div class="mt-3 flex gap-2 md:mt-[0.75vw] md:gap-[0.75vw]">
							{#each button_mapping as button}
								<button
									type="button"
									aria-label={button.label}
									class="btn btn-warning size-7 min-h-full rounded-lg p-0 md:h-[2vw] md:w-[2vw] md:rounded-[0.5vw]"
								>
									{@html button.icon}
								</button>
							{/each}
						</div>
					</div>
				</div>
				<div class="col-span-12 mt-10 flex flex-col gap-[0.75vw] md:col-span-5 md:mt-0">
					<div class="flex gap-[0.75vw]">
						<h3 class="text-lg font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">
							Synopsis
						</h3>
						<button
							aria-label="Synopsis"
							class="btn btn-neutral hidden min-h-full rounded-[0.1875vw] p-0 md:flex md:h-[1.5vw] md:w-[1.5vw]"
						>
							<coreicons-shape-settings variant="filled" class="size-[0.75vw] opacity-75"
							></coreicons-shape-settings>
						</button>
					</div>
					<ScrollArea
						class="text-justify text-xs md:text-[0.8vw] md:leading-[1vw]"
						parent_class="max-h-28 md:max-h-[10vw]"
						offset_scrollbar={true}
						gradient_mask={true}
					>
						{anime_synopsis}
					</ScrollArea>
					<div class="hidden gap-[0.75vw] text-accent md:flex md:text-[0.75vw] md:leading-[0.9vw]">
						{#each ["action", "romance", "shogan"] as genre}
							<span
								class="rounded-[0.5vw] bg-warning font-semibold capitalize text-black md:px-[0.75vw] md:py-[0.4vw]"
								>{genre}</span
							>
						{/each}
					</div>
					<div
						class="hidden w-max gap-[0.75vw] rounded-[0.5vw] bg-secondary md:flex md:px-[0.75vw] md:py-[0.5vw] md:text-[0.75vw] md:leading-[0.75vw]"
					>
						<div class="flex gap-[0.25vw]">
							<span>Score:</span>
							<span class="text-warning-400 font-semibold">79</span>
						</div>
						<div class="flex gap-[0.25vw]">
							<span>Status:</span>
							<button
								class="btn h-min min-h-min gap-[0.25vw] border-none !bg-transparent p-0 leading-none md:text-[0.75vw]"
							>
								<span class="font-semibold text-warning">Watching</span>
								<coreicons-shape-chevron variant="down" class="text-warning-400 w-[0.75vw]"
								></coreicons-shape-chevron>
							</button>
						</div>
						<div class="flex gap-[0.25vw]">
							<span>Episode:</span>
							<span class="text-warning-400 font-semibold">0/9</span>
						</div>
						<div class="flex gap-[0.25vw]">
							<span>Your Score:</span>
							<button
								class="btn h-min min-h-min border-none !bg-transparent p-0 leading-none md:text-[0.75vw]"
							>
								<span class="font-semibold text-warning">Not Rated</span>
								<coreicons-shape-chevron variant="down" class="text-warning-400 w-[0.75vw]"
								></coreicons-shape-chevron>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="my-7 block md:my-[6vw]">
				<div class="flex border-b-2 border-neutral pb-1 md:gap-x-[0.75vw] md:border-none md:pb-0">
					<div class="text-lg font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">
						Episodes
					</div>
					<button
						aria-label="Episodes"
						class="btn btn-neutral hidden min-h-full rounded p-0 md:flex md:h-[1.5vw] md:w-[1.5vw] md:items-center md:justify-center"
					>
						<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
						></coreicons-shape-settings>
					</button>
				</div>
				<div class="mt-2 flex flex-col justify-between gap-y-5 md:mt-0 md:flex-row md:gap-y-0">
					<div class="hidden items-end gap-2 md:flex md:gap-[1vw]">
						<p class="flex items-center gap-1 md:gap-[0.75vw]">
							<span class="text-base font-bold leading-none md:text-[2vw] md:leading-[1.9vw]"
								>23</span
							>
							<span class="text-xs font-semibold md:text-[1vw]">episodes</span>
							<coreicons-shape-circle variant="filled" class="w-[0.4vw] opacity-50"
							></coreicons-shape-circle>
						</p>
						<div class="flex flex-col md:gap-[0.25vw]">
							<div class="flex w-full items-center gap-2 leading-4 md:gap-[1vw] md:leading-[1.5vw]">
								<span class="flex-shrink-0 text-[0.5rem] font-medium md:text-[0.75vw]"
									>Available in</span
								>
								<div class="h-[0.1rem] w-full bg-accent opacity-25 md:h-[0.05vw]"></div>
							</div>
							<div
								class="flex h-5 items-center gap-2 text-[0.5rem] font-bold md:h-[1.8vw] md:gap-[0.75vw] md:text-[0.75vw]"
							>
								{#each ["sub", "dub"] as item}
									<span
										class="flex h-full place-items-center rounded bg-neutral px-2 uppercase leading-[0.9vw] md:rounded-[0.5vw] md:px-[0.9vw]"
										>{item}</span
									>
								{/each}
								<coreicons-shape-circle variant="filled" class="w-[0.4vw] opacity-50"
								></coreicons-shape-circle>
								{#each ["1080p", "720p"] as item}
									<span
										class="flex h-full place-items-center rounded bg-neutral px-2 uppercase leading-[0.9vw] md:rounded-[0.5vw] md:px-[0.9vw]"
										>{item}</span
									>
								{/each}
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-2 md:items-end md:gap-[0.75vw]">
						<p class="flex items-center gap-1 md:hidden">
							<span class="text-base font-bold leading-none">23</span>
							<span class="text-sm font-semibold">episodes</span>
						</p>
						<div class="hidden flex-col gap-2 md:flex md:gap-[0.5vw]">
							<span class="text-[0.65rem] leading-[0.9vw] md:text-[0.8vw]">Type</span>
							<button
								class="btn btn-neutral h-7 min-h-full rounded px-3 text-[0.65rem] font-semibold md:h-[2.5vw] md:rounded-[0.75vw] md:px-[0.9vw] md:text-[0.9vw] md:leading-[0.9vw]"
							>
								<span>Subbed</span>
								<coreicons-shape-chevron variant="down" class="w-3 md:w-[1vw]"
								></coreicons-shape-chevron>
							</button>
						</div>
						<div class="hidden flex-col gap-2 md:flex md:gap-[0.5vw]">
							<span class="text-[0.65rem] leading-[0.9vw] md:text-[0.8vw]">Display Mode</span>
							<button
								class="btn btn-neutral h-7 min-h-full rounded px-3 text-[0.65rem] font-semibold md:h-[2.5vw] md:rounded-[0.75vw] md:px-[0.9vw] md:text-[0.9vw] md:leading-[0.9vw]"
							>
								<span>Thumbnails</span>
								<coreicons-shape-chevron variant="down" class="w-3 md:w-[1vw]"
								></coreicons-shape-chevron>
							</button>
						</div>
						<button
							class="btn btn-neutral size-7 min-h-max p-0 font-semibold md:ml-0 md:h-[2.5vw] md:w-[2.4vw] md:rounded-[0.75vw] md:leading-[0.9vw]"
							aria-label="Search"
						>
							<coreicons-shape-search class="w-4 md:w-[1vw]"></coreicons-shape-search>
						</button>
					</div>
				</div>
				<div class="mt-4 grid grid-cols-12 gap-5 md:mt-[2.5vw] md:gap-[2.5vw]">
					{#each anime_episode_mapping as episode, idx}
						<!-- NOTE: idx for testing -->
						<a
							href="/anime/mal/{$page.params.anime_id}/episode/{idx + 1}"
							class="relative col-span-12 flex gap-5 md:col-span-4"
						>
							<div class="relative flex h-24 w-40 flex-shrink-0 md:h-[18vw] md:w-full">
								<div
									class="absolute inset-0 flex bg-gradient-to-t from-secondary/75 to-transparent md:h-[12vw]"
								></div>
								<img
									src={episode.banner}
									alt=""
									style="object-fit: cover;"
									class="h-full w-full shrink-0 rounded-xl bg-center md:rounded-t-[1vw]"
								/>
								<div
									class="absolute inset-x-0 bottom-0 flex items-center justify-between p-1 md:hidden"
								>
									<span
										class="rounded-lg bg-secondary/75 px-2 py-1 text-xs font-semibold text-accent"
										>01</span
									>
									<span
										class="rounded-lg bg-secondary/75 px-2 py-1 text-xs font-semibold text-accent"
									>
										{episode.duration}
									</span>
								</div>
							</div>
							<div
								class="flex h-full w-full flex-col items-start justify-between md:absolute md:bottom-0 md:h-auto md:rounded-b-[0.625vw] md:bg-secondary md:p-[1vw]"
							>
								<div
									class="absolute inset-x-0 bottom-0 hidden justify-between md:-top-[2.5vw] md:flex md:px-[1vw]"
								>
									<p
										class="rounded bg-secondary/75 p-1 text-xs font-bold tracking-wider md:h-max md:rounded-[0.4vw] md:bg-secondary md:px-[0.55vw] md:py-[0.55vw] md:text-[0.8vw] md:leading-none"
									>
										EP 01
									</p>
									<p
										class="rounded bg-secondary/75 p-1 py-0 text-[0.7rem] font-semibold md:h-max md:rounded-[0.4vw] md:bg-secondary md:px-[0.5vw] md:py-[0.55vw] md:text-[0.8vw] md:leading-none"
									>
										{episode.duration}
									</p>
								</div>
								<div
									class="relative flex w-full flex-col items-start gap-2 md:h-full md:h-max md:gap-[0.5vw]"
								>
									<HoverExpand
										class="text-sm font-medium leading-4 text-accent md:text-[1vw] md:leading-[1.25vw]"
										height="md:max-h-[1.15vw] md:hover:max-h-[9vw]"
									>
										{episode.name}
									</HoverExpand>
									<HoverExpand
										class="text-sm font-medium leading-4 md:text-[0.9vw] md:leading-[1.1vw]"
										height="md:max-h-[1.15vw] md:hover:max-h-[9vw]"
									>
										{episode.japanese_name}
									</HoverExpand>
								</div>

								<div class="relative flex w-full items-center gap-2 md:gap-[0.5vw] md:pt-[0.75vw]">
									<div class="flex gap-2 leading-none md:gap-[0.65vw]">
										{#each episode.formats as format}
											<span
												class="rounded text-xs font-semibold uppercase tracking-wider md:bg-neutral md:px-[0.35vw] md:text-[0.8vw]"
											>
												{format}
											</span>
										{/each}
									</div>
									<coreicons-shape-circle variant="filled" class="w-1 opacity-50 md:w-[0.25vw]"
									></coreicons-shape-circle>
									<div class="flex gap-2 leading-none md:gap-[0.65vw]">
										{#each episode.resolutions as res}
											<span
												class="text-xs font-semibold uppercase tracking-wider md:rounded md:text-[0.8vw]"
											>
												{res}
											</span>
										{/each}
									</div>
								</div>
							</div>
						</a>
					{/each}
				</div>
				<div class="mt-10 flex grid-cols-5 flex-col gap-10 md:mt-[3vw] md:grid md:gap-[4.375vw]">
					<div class="flex flex-col gap-2 md:col-span-3">
						<div
							class="flex gap-2 border-b-2 border-neutral pb-1 md:gap-[0.75vw] md:border-none md:pb-0"
						>
							<h3 class="text-base font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">
								Comments
							</h3>
							<button
								aria-label="Comments"
								class="btn btn-neutral hidden min-h-full rounded p-0 md:flex md:h-[1.5vw] md:w-[1.5vw]"
							>
								<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
								></coreicons-shape-settings>
							</button>
						</div>
						<div class="flex items-center justify-between md:hidden">
							<p class="flex items-center gap-1 md:hidden">
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
						<div class="md:mt-[1vw]">
							<!-- <CommentBox submit_url={reverse("anime-commment-endpoint", Number(pk))}></CommentBox> -->
						</div>
						<div class="mt-10 flex w-full md:mt-[2vw]">
							<!-- <Comment
								api_url={reverse("anime-commment-endpoint", Number(pk))}
								submit_url={reverse("anime-commment-endpoint", Number(pk))}
							></Comment> -->
						</div>
					</div>
					<div class="md:col-span-2">
						<div
							class="flex gap-2 border-b-2 border-neutral pb-1 md:gap-[0.75vw] md:border-none md:pb-0"
						>
							<h1 class="text-base font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">
								Forum Posts
							</h1>
							<button
								aria-label="Forum Posts"
								class="btn btn-neutral hidden min-h-full rounded p-0 md:flex md:h-[1.5vw] md:w-[1.5vw]"
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
								class="card w-full grid-cols-7 overflow-hidden rounded-lg !bg-neutral/50 md:grid md:rounded-[1vw]"
							>
								<div class="col-span-2 block h-16 md:h-full md:w-full">
									<img
										alt=""
										src="https://timelinecovers.pro/facebook-cover/download/anime-your-lie-in-april-kaori-and-arima-facebook-cover.jpg"
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
											Ousei Arima is a child prodigy known as the "Human Metronome"for playing the
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
											<div class="">7 months ago</div>
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
				</div>
			</div>
		</div>
		<div class="hidden flex-col gap-[1vw] md:col-span-2 md:flex">
			<div class="flex gap-[0.75vw]">
				<h3 class="font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">Ratings</h3>
				<button class="btn btn-neutral min-h-full p-0 md:h-[1.5vw] md:w-[1.5vw] md:rounded-[0.5vw]">
					<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
					></coreicons-shape-settings>
				</button>
			</div>
			<div class="flex flex-col gap-[0.75vw]">
				<div class="flex items-center gap-[0.5vw]">
					<span
						class="border-b-2 border-warning pb-[0.5vw] font-bold text-warning md:text-[2vw] md:leading-[1.5vw]"
						>92%</span
					>
					<span
						class="divider-vertical m-0 font-semibold md:pl-1 md:text-[0.75vw] md:leading-[0.8vw]"
						>2.8k ratings</span
					>
				</div>
				<div class="block">
					<div class="flex items-center md:gap-[0.25vw]">
						<span class="font-semibold text-info md:text-[1vw] md:leading-[1.5vw]">#80</span>
						<span class="text-info md:text-[0.75vw] md:leading-[0.75vw]">Trending of all time</span>
					</div>
					<div class="flex items-center md:gap-[0.25vw]">
						<span class="font-semibold md:text-[1vw] md:leading-[1.5vw]">#108</span>
						<span class="md:text-[0.75vw] md:leading-[0.75vw]">Most popular anime</span>
					</div>
				</div>
				<button
					class="btn btn-accent min-h-full md:h-[1.5vw] md:w-max md:rounded-[0.25vw] md:px-[0.75vw] md:text-[0.75vw]"
				>
					<coreicons-shape-trending variant="up" class="size-[1vw]"></coreicons-shape-trending>
					<span>Detailed Distribution</span>
				</button>
				<div class="flex flex-col gap-[0.5vw] leading-none md:mt-[0.5vw]">
					<span class="font-semibold md:text-[0.9vw] md:leading-[0.9vw]">Your rating</span>
					<div class="flex items-center gap-[0.75vw]">
						<!-- <Rating /> -->
						<span class="font-bold leading-none text-info md:text-[0.95vw]">92%</span>
						<button
							aria-label="Edit rating"
							class="btn btn-warning min-h-full p-[0.3vw] md:size-[1.375vw] md:rounded-[0.35vw]"
						>
							<coreicons-shape-edit class="size-[0.75vw]" variant="pencil"></coreicons-shape-edit>
						</button>
					</div>
				</div>
				<button
					class="btn flex h-min min-h-full w-max items-center gap-[0.5vw] border-none !bg-transparent p-0 md:text-[0.85vw]"
				>
					Add a review
					<coreicons-shape-external-link class="size-[0.8vw]"></coreicons-shape-external-link>
				</button>
			</div>
			<div class="flex gap-[0.75vw] md:mt-[6vw]">
				<h3 class="font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">Details</h3>
				<button class="btn btn-neutral min-h-full p-0 md:h-[1.5vw] md:w-[1.5vw] md:rounded-[0.5vw]">
					<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
					></coreicons-shape-settings>
				</button>
			</div>
			<div class="md:mb-[2vw] md:mt-[1.25vw]">
				<div class="flex flex-col gap-[1.125vw] capitalize">
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">format</p>
						<p>TV</p>
					</div>
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">episodes</p>
						<p>22</p>
					</div>
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">episode Duration</p>
						<p>26 Minutes</p>
					</div>
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">status</p>
						<p>finished</p>
					</div>
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">start date</p>
						<p>Apr 23, 2012</p>
					</div>
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">end date</p>
						<p>Sep 16, 2012</p>
					</div>
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">season</p>
						<p>spring 2012</p>
					</div>
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">studios</p>
						<p>Kyoto Animation</p>
					</div>
					<div class="flex flex-col gap-[0.75vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">producers</p>
						<p>Animation Do</p>
						<p>Kadokawa Shoten</p>
						<p>Klock Worx</p>
						<p>Lantis</p>
						<p>chara-ani.com</p>
					</div>
					<div class="flex flex-col gap-[0.5vw] text-[0.9375vw] leading-none">
						<p class="font-semibold text-accent">source</p>
						<p>Night Novel</p>
					</div>
				</div>
				<div class="mt-[2.5vw] block">
					<div class="flex gap-[0.75vw]">
						<h3 class="font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">
							Voiceover Cast
						</h3>
						<button
							class="btn btn-neutral min-h-full p-0 md:h-[1.5vw] md:w-[1.5vw] md:rounded-[0.5vw]"
						>
							<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
							></coreicons-shape-settings>
						</button>
					</div>
					<div class="mt-[1vw] flex flex-col">
						<span class="text-[0.9375vw]">VAs</span>
						<button
							class="btn btn-neutral mt-[0.3vw] h-[2vw] min-h-full w-[6.625vw] gap-1 rounded-[0.5vw] p-0 text-[0.875vw]"
						>
							Japanese
							<coreicons-shape-chevron variant="down" class="size-[1vw]"></coreicons-shape-chevron>
						</button>
					</div>
					<div class="mt-[1vw] block">
						<div
							class="relative grid h-[9vw] w-full grid-cols-2 gap-[2px] overflow-hidden rounded-[0.75vw]"
						>
							<div class="relative col-span-1 w-full bg-cover">
								<img
									alt=""
									src="https://i.pinimg.com/550x/ed/47/64/ed4764a0074e785738f2797641aeb411.jpg"
									class="absolute h-full w-full object-cover object-center"
								/>
								<span
									class="absolute bottom-[0.5vw] z-10 w-full text-center text-[0.9vw] font-bold leading-[1vw] text-accent md:px-[1vw]"
									>Houtarou Oreki</span
								>
							</div>
							<div class="relative col-span-1 w-full bg-cover">
								<img
									alt=""
									src="https://animeanime.global/wp-content/uploads/2020/10/360236.jpg"
									class="absolute h-full w-full object-cover object-center"
								/>
								<span
									class="absolute bottom-[0.5vw] z-10 w-full text-center text-[0.9vw] font-bold leading-[1vw] text-accent md:px-[1vw]"
									>Yuuichi Nakamura</span
								>
							</div>
							<div
								class="gradient absolute inset-0 rounded-b-[0.45vw] bg-gradient-to-t from-secondary/75 to-secondary/5"
							></div>
						</div>
						<div class="mt-[1vw] flex flex-col md:gap-[0.75vw]">
							<div class="flex items-center md:gap-[0.5vw]">
								<button class="btn btn-neutral min-h-full bg-neutral/50 p-0 md:h-[2vw] md:w-[2vw]">
									<coreicons-shape-chevron variant="left" class="size-[1vw]"
									></coreicons-shape-chevron>
								</button>
								<button
									class="btn btn-neutral min-h-full p-0 md:h-[2vw] md:w-[2vw] md:text-[0.85vw]"
									>1</button
								>
								<button class="btn btn-neutral min-h-full bg-neutral/50 p-0 md:h-[2vw] md:w-[2vw]">
									<coreicons-shape-chevron variant="right" class="size-[1vw]"
									></coreicons-shape-chevron>
								</button>
							</div>
							<span class="text-[0.75vw] leading-none">Showing 1-5, out of 58 Voiceover</span>
						</div>
					</div>
				</div>
				<div class="mt-[2.5vw] block">
					<div class="flex gap-[0.75vw]">
						<h3 class="font-semibold text-info md:text-[1.25vw] md:leading-[1.5vw]">
							Similar Animes
						</h3>
						<button
							class="btn btn-neutral min-h-full p-0 md:h-[1.5vw] md:w-[1.5vw] md:rounded-[0.5vw]"
						>
							<coreicons-shape-settings variant="filled" class="w-[0.75vw] opacity-75"
							></coreicons-shape-settings>
						</button>
					</div>
					<div class="mt-[1vw] block">
						<div class="grid grid-cols-2 gap-[0.75vw]">
							<a
								href="/myanimelist/1"
								class="card relative col-span-1 h-[9.375vw] w-full overflow-hidden rounded-[0.75vw] bg-cover bg-center"
							>
								<img
									alt=""
									src="https://cdn.myanimelist.net/images/anime/1958/107912.jpg"
									class="absolute h-full w-full object-cover object-center"
								/>
								<span
									class="absolute bottom-[0.3vw] z-10 line-clamp-2 w-full px-[0.5vw] text-center text-[0.9vw] font-semibold leading-[1.25vw] text-accent"
								>
									Yahari Ore no Seishun Love Come wa Machigatteiru.
								</span>
								<div
									class="gradient absolute inset-0 rounded-b-[0.45vw] bg-gradient-to-t from-secondary/75 to-secondary/5"
								></div>
							</a>
							<a
								href="/myanimelist/1"
								class="card relative col-span-1 h-[9.375vw] w-full overflow-hidden rounded-[0.75vw] bg-cover"
							>
								<img
									alt=""
									src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx849-uXOftsjBDz2T.png"
									class="absolute h-full w-full object-cover object-center"
								/>
								<span
									class="absolute bottom-[0.3vw] z-10 line-clamp-2 w-full px-[0.5vw] text-center text-[0.9vw] font-semibold leading-[1.25vw] text-accent"
								>
									Suzumiya Haruhi no Yuuutsu
								</span>
								<div
									class="gradient absolute inset-0 rounded-b-[0.45vw] bg-gradient-to-t from-secondary/75 to-secondary/5"
								></div>
							</a>
						</div>
						<div class="mt-[1vw] flex flex-col md:gap-[0.75vw]">
							<div class="flex items-center md:gap-[0.5vw]">
								<button class="btn btn-neutral min-h-full bg-neutral/50 p-0 md:h-[2vw] md:w-[2vw]">
									<coreicons-shape-chevron variant="left" class="size-[1vw]"
									></coreicons-shape-chevron>
								</button>
								<button
									class="btn btn-neutral min-h-full p-0 md:h-[2vw] md:w-[2vw] md:text-[0.85vw]"
									>1</button
								>
								<button class="btn btn-neutral min-h-full bg-neutral/50 p-0 md:h-[2vw] md:w-[2vw]">
									<coreicons-shape-chevron variant="right" class="size-[1vw]"
									></coreicons-shape-chevron>
								</button>
							</div>
							<span class="text-[0.75vw] leading-none">Showing 1-8, out of 74 Animes</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
