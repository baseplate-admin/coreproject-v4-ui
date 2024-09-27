<script lang="ts">
	import HoverExpand from "$components/hover_expand.svelte";
	import ScrollArea from "$components/scroll_area.svelte";
	import { FETCH_TIMEOUT } from "$constants/fetch";
	import { cn } from "$functions/classnames";
	import { FormatDate } from "$functions/format_date";
	import { onMount } from "svelte";
	import type { Anime } from "$types/anime";
	import { uniq_by } from "$functions/array/uniq_by";

	// Binding
	let search_query = "",
		active_filters: Array<string> = [],
		thumbnail_mode: "card_with_dropdown" | "detailed_card" = "card_with_dropdown";

	let search_promise: Promise<Anime[]> | null = null;

	onMount(async () => {
		search_promise = get_anime_with_serach_parameters();
	});

	// Mapping
	let filter_options_mapping: {
		[key: string]: {
			title: string;
			class: string;
			value: string;
			items: Array<string | number>;
			selected_items: string[] | null;
		};
	} = {
		time_range: {
			title: "Time Range",
			class: "hidden flex-col",
			value: "",
			items: [],
			selected_items: []
		},
		genres: {
			title: "Genres",
			class: "flex flex-col",
			value: "",
			items: ["action", "adventure", "hentai", "romance"],
			selected_items: []
		},
		year: {
			title: "Year",
			class: "hidden md:flex flex-col",
			value: "",
			items: [2020, 2021, 2022, 2023],
			selected_items: []
		},
		season: {
			title: "Season",
			class: "flex flex-col",
			value: "",
			items: ["winter", "spring", "summer", "fall"],
			selected_items: []
		},
		format: {
			title: "Format",
			class: "hidden md:flex flex-col",
			value: "",
			items: ["tv show", "movie"],
			selected_items: []
		},
		airing_status: {
			title: "Airing Status",
			class: "hidden flex-col",
			value: "",
			items: [],
			selected_items: []
		},
		sort_by: {
			title: "Sort by",
			class: "hidden flex-col",
			value: "",
			items: [],
			selected_items: []
		}
	};

	// Functions
	const handle_input = async () => {
			search_promise = get_anime_with_serach_parameters();
		},
		update_selected_items = (key: string, selected_item: string) => {
			let filter_option = filter_options_mapping[key];
			let is_selected = filter_option.selected_items!.some((item) => item === selected_item);

			if (is_selected) {
				// if selected: remove from seleted list
				filter_option.selected_items = filter_option.selected_items!.filter(
					(item) => item !== selected_item
				);
				// remove from active filters
				active_filters = active_filters.filter((filter) => filter !== selected_item);
			} else {
				// else: add to selected list
				filter_option.selected_items = [...filter_option.selected_items!, selected_item];
				// add to active filters
				active_filters = [...active_filters, selected_item];
			}

			// update filer_options_mapping
			filter_options_mapping[key] = filter_option;
			// run fetch
			handle_input();
		},
		clear_selected_items = (key: string) => {
			filter_options_mapping[key].selected_items = [];
			// run fetch
			handle_input();
		},
		change_thumbnail_mode = (mode: typeof thumbnail_mode) => {
			thumbnail_mode = mode;
		};

	const get_anime_with_serach_parameters = async (): Promise<Anime[]> => {
		let url = new URL(
			window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
			// + reverse(`anime-list`)
		);

		const search_map = {
			name: search_query,
			genres: filter_options_mapping["genres"].selected_items
				?.map((item) => {
					return item.toLowerCase();
				})
				.join()
		};
		for (const [key, value] of Object.entries(search_map)) {
			if (value?.length) {
				url.searchParams.set(key, String(value));
			}
		}

		const res = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
				// "X-CSRFToken": get_csrf_token()
			},
			signal: AbortSignal.timeout(FETCH_TIMEOUT)
		});
		const json = await res.json();

		if (res.ok) {
			return uniq_by(json["results"], "mal_id") as Array<Anime>;
		} else {
			throw new Error("Something is wrong from the backend");
		}
	};
</script>

<section
	class="mt-20 flex h-max flex-col p-5 md:mt-0 md:gap-[1.5vw] md:pb-[2.5vw] md:pl-[1.5vw] md:pr-[3.75vw] md:pt-0"
>
	<div class="flex flex-col gap-2 md:gap-[0.5vw]">
		<div class="text-3xl font-bold leading-none md:text-[2vw]">
			Anime <span class="text-warning">Explore</span>
		</div>
		<span class="text-base font-normal leading-none md:text-[1.1vw]"
			>Unleash your inner Otaku: Explore anime wonders</span
		>
	</div>

	<div class="mt-7 flex flex-col gap-2 md:hidden">
		<span class="text-base font-semibold leading-none">Search Animes</span>
		<div class="relative flex items-center">
			<coreproject-shape-search class="pointer-events-none absolute ml-4 size-4"
			></coreproject-shape-search>
			<input
				type="text"
				placeholder="Looking for specific anime? Start from here..."
				class="w-full rounded-xl border-none bg-neutral py-3 pl-12 leading-none focus:ring-0 md:bg-neutral"
			/>
		</div>
	</div>

	<div class="mt-4 flex items-end justify-between gap-3 md:mt-0 md:gap-0">
		<div class="flex items-center gap-3 md:gap-[1.5vw]">
			<div class="hidden flex-col md:flex md:gap-[0.5vw]">
				<span class="text-[1vw] font-semibold leading-none">Search Animes</span>
				<div class="relative flex items-center">
					<div class="absolute md:ml-[1vw]">
						<coreproject-shape-search class="md:w-[1.1vw]"></coreproject-shape-search>
					</div>
					<input
						bind:value={search_query}
						on:input={handle_input}
						type="text"
						placeholder="Looking for specific anime? Start from here..."
						class="w-[30vw] rounded-[0.75vw] border-none bg-neutral py-[0.8vw] pl-[3vw] text-[1vw] font-semibold leading-none text-neutral-content placeholder:font-medium placeholder:text-neutral-content/75 focus:ring-0"
					/>
				</div>
			</div>
			{#each Object.entries(filter_options_mapping) as option}
				{@const title = option[1].title}
				{@const klass = option[1].class}
				{@const selected_items = option[1].selected_items}
				{@const filter_items = option[1].items}

				<div class={cn(klass, "group dropdown dropdown-bottom gap-2 md:gap-[0.5vw]")}>
					<span class="font-semibold leading-none md:text-[1vw]">{title}</span>
					<div class="relative flex items-center">
						<span
							class="pointer-events-none absolute flex cursor-pointer items-center md:gap-[0.25vw]"
						>
							{#if selected_items}
								{#if selected_items.length}
									<span
										class="badge badge-primary ml-3 rounded-md p-1 text-sm font-semibold capitalize md:ml-[0.75vw] md:h-[1.5vw] md:rounded-[0.5vw] md:p-[0.35vw] md:text-[0.85vw]"
									>
										<!-- show first item -->
										{selected_items[0]}
									</span>
								{:else}
									<span
										class="ml-3 text-base group-focus-within:opacity-0 md:ml-[1vw] md:text-[0.9vw]"
										>Any</span
									>
								{/if}
								<!-- show count of remaining items if exists -->
								{#if selected_items.length > 1}
									<span
										class="badge badge-neutral ml-1 rounded-md p-1 text-sm font-semibold md:ml-[0.15vw] md:h-[1.5vw] md:rounded-[0.5vw] md:p-[0.35vw] md:text-[0.85vw]"
									>
										+{selected_items.filter((item) => item !== selected_items[0]).length}
									</span>
								{/if}
							{/if}
						</span>
						<input
							bind:value={option[1].value}
							on:blur={() => (option[1].value = "")}
							type="text"
							tabindex="0"
							role="button"
							class="peer placeholder w-full rounded-lg border-none bg-neutral/50 py-3 text-base font-semibold leading-none text-neutral-content placeholder:font-medium focus:ring-0 md:w-[10vw] md:rounded-[0.75vw] md:py-[0.8vw] md:pl-[1vw] md:text-[1vw]"
						/>
						{#if selected_items?.length}
							<button
								aria-label="Clear input"
								on:click|preventDefault={() => clear_selected_items(option[0])}
								class="absolute right-0 mr-3 w-4 md:mr-[1vw] md:w-[1vw]"
							>
								<coreproject-shape-x variant="no-border" class="md:w-[1vw]"></coreproject-shape-x>
							</button>
						{:else}
							<button
								aria-label="Dropdown btn"
								class="absolute right-0 mr-3 w-4 md:mr-[1vw] md:w-[1vw]"
							>
								<coreproject-shape-chevron variant="down" class="md:w-[1vw]"
								></coreproject-shape-chevron>
							</button>
						{/if}
					</div>

					{#if filter_items}
						<div
							class="dropdown-content z-10 mt-2 w-full overflow-x-hidden rounded-lg md:mt-[1vw] md:rounded-[0.75vw]"
						>
							<ScrollArea
								gradient_mask={false}
								class="flex w-full flex-col md:p-[0.35vw]"
								parent_class="md:max-h-[30vw] bg-neutral w-full"
							>
								{#each Object.values(filter_items) as value}
									{@const is_selected = selected_items?.some((item) => item === String(value))}

									<button
										on:click|preventDefault={() => {
											update_selected_items(option[0], String(value));
										}}
										class="btn btn-neutral relative flex h-max min-h-max items-center justify-start rounded-none p-3 py-3 text-sm leading-none md:rounded-[0.5vw] md:px-[1vw] md:py-[0.75vw] md:text-[0.9vw]"
									>
										<span class="capitalize">{value}</span>

										{#if is_selected}
											<div
												class="absolute right-3 rounded-full bg-primary p-1 text-white md:right-[0.75vw] md:p-[0.25vw]"
											>
												<coreproject-shape-check class="w-2 text-white md:w-[0.75vw]"
												></coreproject-shape-check>
											</div>
										{/if}
									</button>
								{/each}
							</ScrollArea>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<button
			aria-label="Preferences"
			class="btn btn-neutral h-max min-h-max rounded-lg border-none p-[0.85rem] md:rounded-[0.75vw] md:p-[0.8vw]"
		>
			<coreproject-shape-preferences class="w-4 md:w-[1.1vw]"></coreproject-shape-preferences>
		</button>
	</div>

	<div class="mt-16 flex flex-col gap-5 md:mt-[1.5vw] md:gap-[1vw]">
		<div class="flex items-center justify-between gap-2 md:gap-0">
			<div class="flex flex-col gap-2 md:gap-[0.35vw]">
				<span class="text-xl font-semibold leading-none text-accent md:text-[1.35vw]"
					>Trending Now</span
				>
				<span class="text-sm leading-none md:text-[1vw]">Crowd Favorites: Anime Hits and Hype</span>
			</div>
			<div class="flex gap-2 md:gap-[0.75vw]">
				<button class="btn h-max min-h-max border-none !bg-transparent p-0 md:gap-[0.75vw]">
					<coreproject-shape-expand class="w-4 md:w-[1vw]"></coreproject-shape-expand>
					<span class="font-semibold md:text-[1vw]">Trending</span>
				</button>
				<div
					class="divider divider-horizontal m-0 md:w-[0.5vw] md:before:w-[0.15vw] md:after:w-[0.15vw]"
				></div>
				<button
					aria-label="Grid layout"
					class="btn h-max min-h-max border-none !bg-transparent p-0"
					on:click={() => change_thumbnail_mode("card_with_dropdown")}
				>
					<coreproject-shape-grid class="w-4 md:w-[1.15vw]"></coreproject-shape-grid>
				</button>
				<button
					aria-label="Thumbnail layout"
					class="btn h-max min-h-max border-none !bg-transparent p-0"
					on:click={() => change_thumbnail_mode("detailed_card")}
				>
					<coreproject-shape-box class="w-4 md:w-[1.15vw]"></coreproject-shape-box>
				</button>
			</div>
		</div>

		{#if search_promise}
			{#await search_promise}
				<div class="grid h-full place-items-center">
					<span class="loading loading-ring loading-lg"></span>
				</div>
			{:then results}
				{#if results.length}
					{#if thumbnail_mode === "detailed_card"}
						<div class="mt-5 grid grid-cols-2 gap-3 md:mt-[1.25vw] md:grid-cols-3 md:gap-[1.5vw]">
							{#each results as anime}
								<a
									href="/mal/{anime.mal_id}"
									class="relative col-span-1 grid grid-cols-1 md:grid-cols-2"
								>
									<div class="relative">
										<img
											src={anime.cover}
											alt={anime.name}
											class="h-44 w-full rounded-t-lg object-cover object-center md:h-[20vw] md:rounded-l-[0.35vw] md:rounded-r-none"
										/>
										<div
											class="absolute inset-x-0 bottom-0 rounded-b-lg backdrop-blur md:rounded-l-[0.35vw]"
										>
											<div
												class="flex w-full flex-col bg-secondary/95 p-3 md:gap-[0.35vw] md:p-[1vw]"
											>
												<HoverExpand
													class="w-full text-sm font-semibold text-accent md:text-[1vw] md:leading-[1.35vw]"
													height="md:max-h-[1.35vw] md:hover:max-h-[10vw]"
												>
													{anime.name}
												</HoverExpand>
												<span class="line-clamp-1 text-xs md:line-clamp-none md:text-[0.8vw]">
													{#if anime.studios?.length}
														{anime.studios[0]}
													{/if}
												</span>
											</div>
										</div>
									</div>

									<div
										class="rounded-rt-none flex flex-col justify-between rounded-b-lg bg-neutral/25 md:rounded-l-none md:rounded-r-[0.35vw]"
									>
										<div class="flex flex-col gap-1 p-3 leading-none md:gap-[0.5vw] md:p-[1vw]">
											<span class="text-xs font-semibold capitalize md:text-[1vw]">
												{new FormatDate(anime.aired_from ?? "").format_to_season}
											</span>
											<div class="flex items-center gap-1 md:gap-[0.5vw]">
												<span class="text-xs md:text-[0.8vw]">{anime.source}</span>
												<coreproject-shape-circle
													variant="filled"
													class="w-1 opacity-50 md:w-[0.25vw]"
												></coreproject-shape-circle>
												<span class="text-xs md:text-[0.8vw]">{anime.episode_count} eps</span>
											</div>
											<ScrollArea
												offset_scrollbar
												gradient_mask
												parent_class="max-h-12 md:max-h-[11vw] md:mt-[0.5vw]"
												class="text-surface-300 text-xs leading-snug md:text-justify md:text-[0.85vw] md:leading-[1vw]"
											>
												{anime.synopsis}
											</ScrollArea>
										</div>

										<div
											class="flex items-center gap-2 overflow-x-scroll p-3 pt-0 scrollbar-none md:gap-[0.5vw] md:p-[1vw]"
										>
											{#each anime?.genres ?? [] as genre}
												<span
													class="whitespace-nowrap rounded-sm bg-warning p-1 text-xs font-semibold capitalize leading-none text-black md:rounded-[0.25vw] md:px-[0.6vw] md:py-[0.3vw] md:text-[0.8vw]"
												>
													{genre.name}
												</span>
											{/each}
										</div>
									</div>
								</a>
							{/each}
						</div>
					{:else if thumbnail_mode === "card_with_dropdown"}
						<div class="mt-5 grid grid-cols-3 gap-3 md:mt-[1.25vw] md:grid-cols-6 md:gap-[1.5vw]">
							{#each results as anime}
								<div class="dropdown dropdown-hover">
									<button class="relative w-full" tabindex="0" aria-expanded={false}>
										<img
											class="h-44 w-full rounded-lg object-cover object-center md:h-[20vw] md:rounded-[0.5vw]"
											src={anime.cover}
											alt={anime.name}
											style=""
											loading="lazy"
										/>
										<div
											class="absolute inset-x-0 bottom-0 rounded-b-lg backdrop-blur md:rounded-b-[0.5vw]"
										>
											<div
												class="flex w-full flex-col items-start gap-1 bg-secondary/95 p-3 md:gap-[0.35vw] md:p-[1vw]"
											>
												<HoverExpand
													class="line-clamp-1 w-full text-start text-sm font-semibold text-accent md:line-clamp-none md:text-[1vw] md:leading-[1.35vw]"
													height="md:max-h-[1.35vw] hover:max-h-[10vw]"
												>
													{anime.name}
												</HoverExpand>
												<div
													class="hidden items-center gap-2 text-xs leading-none md:flex md:gap-[0.35vw] md:text-[0.8vw]"
												>
													{#each anime.studios ?? [] as studio, index}
														{@const show_dot = index !== (anime.studios ?? []).length - 1}

														<span>{studio.name}</span>
														{#if show_dot}
															<coreproject-shape-circle class="md:w-[0.25vw]"
															></coreproject-shape-circle>
														{/if}
													{/each}
												</div>
												<span class="text-xs md:hidden"
													>{anime.studios && anime.studios[0].name}</span
												>
											</div>
										</div>
									</button>

									<button
										tabindex="0"
										class="dropdown-content top-0 z-10 hidden flex-col leading-none md:flex md:w-[20vw] md:px-[1.5vw]"
									>
										<div
											class="flex flex-col bg-neutral text-start md:gap-[0.35vw] md:rounded-[0.75vw] md:rounded-t-[0.3vw] md:p-[1vw]"
										>
											<span class="font-semibold text-accent md:text-[1vw] md:leading-[1.25vw]"
												>{anime.name}</span
											>
											<div
												class="text-surface-50 flex w-full items-center md:gap-[0.35vw] md:text-[0.8vw]"
											>
												<div class="flex items-center md:gap-[0.5vw]">
													<coreproject-shape-star class="md:w-[0.9vw]"></coreproject-shape-star>
													<span class="text-surface-50 leading-none md:text-[0.8vw]"
														>{anime.rating} rating</span
													>
												</div>
												<coreproject-shape-circle class="w-1 md:w-[0.25vw]"
												></coreproject-shape-circle>
												<span>TV</span>
												<coreproject-shape-circle class="w-1 md:w-[0.25vw]"
												></coreproject-shape-circle>
												<span>{anime.episode_count} episdoes</span>
											</div>
											<div
												class="text-surface-50 flex items-center gap-2 text-xs leading-none md:gap-[0.35vw] md:text-[0.8vw]"
											>
												{#each anime.studios ?? [] as studio, index}
													{@const show_dot = index !== (anime.studios ?? []).length - 1}

													<span>{studio.name}</span>
													{#if show_dot}
														<coreproject-shape-circle class="md:w-[0.25vw]"
														></coreproject-shape-circle>
													{/if}
												{/each}
											</div>
											<div class="flex items-center md:my-[0.35vw] md:gap-[0.5vw]">
												{#each anime.genres ?? [] as genre}
													<spam
														class="bg-warning font-semibold capitalize leading-none text-black md:rounded-[0.25vw] md:px-[0.6vw] md:py-[0.3vw] md:text-[0.8vw]"
													>
														{genre.name}
													</spam>
												{/each}
											</div>
											<ScrollArea
												gradient_mask
												offset_scrollbar
												parent_class="md:max-h-[4vw]"
												class="text-surface-50 md:text-[0.8vw] md:leading-[1vw]"
											>
												{anime.synopsis}
											</ScrollArea>
											<div class="divider md:m-0 md:before:h-[0.15vw] md:after:h-[0.15vw]"></div>
											<div class="flex items-center md:gap-[0.5vw]">
												<a
													href="/anime/mal/{anime.mal_id}/episode/1"
													class="btn btn-primary h-[2.75vw] min-h-full flex-1 leading-none text-accent md:rounded-[0.5vw]"
												>
													<coreproject-shape-play class="md:w-[0.9vw]"></coreproject-shape-play>
													<span class="font-semibold md:text-[0.9vw]">Start Watching</span>
												</a>
												<a
													aria-label="Info"
													href="/anime/mal/{anime.mal_id}"
													class="btn btn-square h-[2.75vw] min-h-full p-0 leading-none md:rounded-[0.5vw]"
												>
													<coreproject-shape-info class="md:w-[1.2vw]"></coreproject-shape-info>
												</a>
											</div>
										</div>
									</button>
								</div>
							{/each}
						</div>
					{/if}
				{:else}
					<div
						class="flex h-full flex-col items-center justify-center gap-[0.5vw] text-lg md:text-[1.1vw]"
					>
						<span class="font-medium leading-none">No match found!</span>
						<span class="text-center font-semibold leading-none text-error">
							Couldn't find animes with: "{search_query}"
							<br />
							<span class="text-accent/75">Filters: {active_filters.join(" - ")}</span>
						</span>
					</div>
				{/if}
			{:catch error}
				<div
					class="flex h-full flex-col items-center justify-center gap-2 text-lg md:gap-[0.2vw] md:text-[1.1vw]"
				>
					<span class="font-medium leading-none">Oh no, something is wrong!</span>
					<span class="text-center font-semibold leading-none text-error">{@html error}</span>
				</div>
			{/await}
		{/if}
	</div>
</section>
