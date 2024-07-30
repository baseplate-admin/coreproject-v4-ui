<script lang="ts">
	import ScrollArea from "$components/scroll_area.svelte";
	import { cn } from "$functions/classnames";
	import Chevron from "$icons/shapes/chevron.svelte";
	import Cross from "$icons/shapes/cross.svelte";
	import MoreBox from "$icons/shapes/more_box.svelte";
	import Search from "$icons/shapes/search.svelte";
	import Tick from "$icons/shapes/tick.svelte";

	type FilterOption = {
		[key: string]: {
			title: string;
			class: string;
			value: string;
			items: Array<string | number>;
			selected_items: string[] | null;
		};
	};

	let active_filters: Array<string> = [],
		search_query: string = "";

	let filter_options_mapping: FilterOption = {
		time_range: {
			title: "Time Range",
			class: "hidden flex-col md:gap-[0.35vw]",
			value: "",
			items: [],
			selected_items: []
		},
		genres: {
			title: "Genres",
			class: "md:flex flex-col md:gap-[0.35vw]",
			value: "",
			items: ["action", "adventure", "hentai", "romance"],
			selected_items: []
		},
		year: {
			title: "Year",
			class: "md:flex flex-col md:gap-[0.35vw]",
			value: "",
			items: [2020, 2021, 2022, 2023],
			selected_items: []
		},
		season: {
			title: "Season",
			class: "md:flex flex-col md:gap-[0.35vw]",
			value: "",
			items: ["winter", "spring", "summer", "fall"],
			selected_items: []
		},
		format: {
			title: "Format",
			class: "hidden md:flex flex-col md:gap-[0.35vw]",
			value: "",
			items: ["tv show", "movie"],
			selected_items: []
		},
		airing_status: {
			title: "Airing Status",
			class: "hidden flex-col md:gap-[0.35vw]",
			value: "",
			items: [],
			selected_items: []
		},
		sort_by: {
			title: "Sort by",
			class: "hidden flex-col md:gap-[0.35vw]",
			value: "",
			items: [],
			selected_items: []
		}
	};

	const handle_input = async () => {},
		isEmpty = (list: any[]) => {
			if (list.length == 0) return true;
			else return false;
		},
		clear_selected_items = (key: string) => {
			filter_options_mapping[key].selected_items = [];
			handle_input();
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
			handle_input();
		};
</script>

<section class="mt-20 select-none px-5 text-white md:mt-0">
	<div class="flex flex-col">
		<div class="text-3xl font-bold leading-none md:text-[2vw]">
			Anime <span class="text-warning">Explore</span>
		</div>
		<span class="text-base font-normal leading-none md:text-[1.1vw]">
			Unleash your inner Otaku: Explore anime wonders
		</span>
	</div>
	<div class="mt-5 flex flex-col justify-between text-neutral-300 md:flex-row">
		<div class="flex flex-col gap-2">
			<span class="text-base font-semibold leading-none">Search Animes</span>
			<div class="relative flex items-center">
				<Search class="pointer-events-none absolute ml-[1vw] w-[1vw]" />

				<input
					bind:value={search_query}
					on:input={handle_input}
					type="text"
					placeholder="Looking for specific anime? Start from here..."
					class="text-surface-50 md:bg-surface-400/75 w-[30vw] rounded-[0.5vw] border border-neutral bg-neutral py-[0.8vw] pl-[3vw] text-[1vw] leading-none placeholder:text-neutral-content/75 focus:border-primary focus:ring-0"
				/>
			</div>
		</div>

		<div class="mt-3 flex items-end gap-2 md:mt-0">
			{#each Object.entries(filter_options_mapping) as option}
				{@const title = option[1].title}
				{@const klass = option[1].class}
				{@const selected_items = option[1].selected_items}
				{@const filter_items = option[1].items}

				<div class={cn(klass, "group dropdown dropdown-bottom flex-1 md:max-w-36")}>
					<span class="font-semibold leading-none">{title}</span>
					<div class="relative mt-1 flex items-center">
						<span class="absolute flex cursor-pointer items-center md:gap-[0.25vw]">
							{#if selected_items}
								{#if !isEmpty(selected_items)}
									<span
										class="badge badge-primary ml-3 rounded p-1 text-[0.630rem] font-semibold capitalize text-white md:ml-[0.75vw] md:h-[1.5vw] md:rounded-[0.25vw] md:p-[0.35vw]"
									>
										{selected_items[0]}
									</span>
								{:else}
									<span
										class="pointer-events-none ml-3 select-none text-sm duration-300 group-focus-within:opacity-0"
										>Any</span
									>
								{/if}

								{#if selected_items.length > 1}
									<span
										class="badge ml-1 rounded p-1 text-sm font-semibold md:ml-[0.15vw] md:h-[1.5vw] md:rounded-[0.25vw] md:p-[0.35vw] md:text-[0.85vw]"
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
							class="peer placeholder w-full rounded-lg border border-neutral bg-neutral py-2 text-sm font-thin leading-none placeholder:font-medium placeholder:text-neutral-content/75 focus-visible:border-[#7569e1] md:max-w-md"
						/>
						{#if selected_items}
							{#if !isEmpty(selected_items)}
								<button
									on:click|preventDefault={() => clear_selected_items(option[0])}
									class="btn absolute right-0 mr-3 w-4 border-none !bg-transparent p-0 md:mr-[1vw] md:w-[1vw]"
								>
									<Cross class="md:w-[1vw]" />
								</button>
							{:else}
								<button
									class="btn absolute right-0 mr-3 w-4 border-none !bg-transparent p-0 md:mr-[1vw] md:w-[1vw]"
								>
									<Chevron class="md:w-[1vw]" />
								</button>
							{/if}
						{/if}
					</div>

					{#if filter_items}
						<div class="dropdown-content z-10 mt-2 w-full overflow-x-hidden rounded-lg">
							<ScrollArea
								gradient_mask={false}
								class="flex w-full flex-col md:p-[0.35vw]"
								parent_class="md:max-h-[30vw] bg-neutral w-full"
							>
								{#each Object.entries(filter_items) as [key, value]}
									{@const is_selected = selected_items?.some((item) => item === value)}

									<button
										on:click|preventDefault={() => {
											const val = String(value);
											update_selected_items(option[0], val);
										}}
										class="btn btn-neutral relative flex h-max min-h-max items-center justify-start rounded-lg border-2 p-3 py-3 text-sm leading-none focus-visible:border-[#7569e1] focus-visible:bg-secondary/40"
									>
										<span class="capitalize">{value}</span>

										{#if is_selected}
											<div
												class="absolute right-3 rounded-full bg-primary p-1 text-white md:right-[0.75vw] md:p-[0.25vw]"
											>
												<Tick class="w-2 text-white md:w-[0.75vw]" />
											</div>
										{/if}
									</button>
								{/each}
							</ScrollArea>
						</div>
					{/if}
				</div>
			{/each}
			<button class="btn btn-neutral h-9 min-h-0 w-9 rounded-lg !p-0 md:block">
				<MoreBox class="w-3" />
			</button>
		</div>
	</div>

	<div class="mt-8 flex flex-col">
		<div class="flex flex-col gap-2 md:gap-[0.35vw]">
			<span class="text-xl font-semibold leading-none text-accent md:text-[1.35vw]"
				>Trending Now</span
			>
			<span class="text-sm leading-none md:text-[1vw]">Crowd Favorites: Anime Hits and Hype</span>
		</div>
	</div>
</section>
