<script lang="ts">
	import { FormatDate } from "$functions/format_date";
	import { createModalStore } from "$stores/modals.svelte";

	// Icon imports

	import { FETCH_TIMEOUT } from "$constants/fetch";
	import { cn } from "$functions/classnames";
	import Search from "$icons/shapes/search.svelte";
	import Cross from "$icons/shapes/cross.svelte";
	import ScrollArea from "$components/scroll_area.svelte";

	const modal_store = createModalStore();

	let active_index = $state(0),
		active_core = $state<"anime" | "manga" | "sound">("anime"),
		search_query = $state("");

	// Bindings
	let dialog_element: HTMLDialogElement | null = null,
		anime_search_results_container_element: HTMLDivElement | null = null;

	const handle_search_key_down = async (e: KeyboardEvent) => {
			if (!dialog_element?.open) return;
		},
		handle_search_key_press = async (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === "enter") return;
			active_index = 0;
		},
		handle_core_mouse_enter = async (core: typeof active_core, index: number) => {
			active_index = index;
			active_core = core;
		},
		handle_input = async () => {
			// search_promise = search_query === "" ? null : get_anime_with_serach_parameters();
		},
		handle_close = async () => {
			modal_store.close_modal("search");
		},
		handle_global_input = async (e: KeyboardEvent) => {
			// const search_results = await search_promise;
			// if (!search_results) return;
			// switch (e.key.toLowerCase()) {
			// 	case "arrowdown":
			// 		active_index = (active_index + 1) % search_results.length;
			// 		break;
			// 	case "arrowup":
			// 		active_index = (active_index - 1 + search_results.length) % search_results.length;
			// 		break;
			// 	// do tab logic of switching core
			// 	// case "tab":
			// 	//     break;
			// 	case "enter":
			// 		const active_anime_element = anime_search_results_container_element?.children[
			// 			active_index
			// 		] as HTMLAnchorElement;
			// 		active_anime_element.click();
			// 		break;
			// 	default:
			// 		break;
			// }
		};

	const get_anime_with_serach_parameters = async () => {
		// const headers: { [key: string]: string } = {};
		// if ($user_authenticated) {
		// 	headers["X-CSRFToken"] = get_csrf_token();
		// }
		// const res = await fetch(
		// 	reverse(`anime-list`) + "?" + new URLSearchParams({ name: search_query }),
		// 	{
		// 		method: "GET",
		// 		headers: {
		// 			Accept: "application/json",
		// 			"Content-Type": "application/json",
		// 			"X-CSRFToken": get_csrf_token()
		// 		},
		// 		signal: AbortSignal.timeout(FETCH_TIMEOUT)
		// 	}
		// );
		// const json = await res.json();
		// if (res.ok) {
		// 	return json["results"] as Array<Anime>;
		// } else {
		// 	throw new Error("Something is wrong from the backend");
		// }
	};
	// let search_promise: Promise<Anime[]> | null = null;

	$effect(() => {
		if (modal_store.state.get("search")) {
			dialog_element?.showModal();
		}
	});
</script>

<svelte:window onkeyup={(event) => dialog_element?.open && handle_global_input(event)} />

<dialog class="modal bg-secondary/90" bind:this={dialog_element} onclose={handle_close}>
	<div
		class="modal-box flex max-h-max max-w-max scale-[98%] flex-col items-center bg-transparent md:gap-[2vw]"
	>
		<form class="relative flex h-[3.5vw] w-[40vw] items-center">
			<button
				class="btn absolute left-[1.25vw] h-max min-h-max border-none !bg-transparent p-0"
				aria-label="Search"
			>
				<Search style="width: 1.25vw;" />
			</button>
			<input
				bind:value={search_query}
				oninput={handle_input}
				onkeydown={handle_search_key_down}
				onkeypress={handle_search_key_press}
				type="text"
				placeholder="Search for animes, mangas and musics"
				class="size-full border-none bg-neutral font-semibold text-accent outline-none !ring-0 placeholder:font-medium placeholder:text-accent/75 md:rounded-[1vw] md:p-[1vw] md:pl-[3.50vw] md:text-[1.1vw]"
			/>

			<button
				type="button"
				aria-label="Clear"
				class="btn absolute right-[1.25vw] min-h-max border-none !bg-transparent p-0"
				onclick={() => (search_query = "")}
			>
				<Cross style="width: 1.5vw; opacity: 0.7;" />
			</button>
		</form>

		<div class="flex grid grid-cols-3 gap-[4vw] md:h-[30vw] md:w-[70vw]">
			<div class="flex flex-col md:gap-[0.5vw]">
				<span class="text-[1.2vw] font-semibold text-info">anime</span>
				<div
					class="flex h-full flex-col items-center justify-center gap-[0.2vw] bg-neutral text-[1.1vw] text-accent md:rounded-[1vw]"
				>
					<span class="font-medium leading-none text-warning">Search Away</span>
					<span class="font-semibold leading-none">"Find Your Anime Bliss"</span>
				</div>
			</div>
			<div class="flex flex-col md:gap-[0.5vw]">
				<span class="text-[1.2vw] font-semibold">manga</span>
				<div
					class="flex h-full flex-col items-center justify-center gap-[0.2vw] bg-neutral text-[1.1vw] text-accent md:rounded-[1vw]"
				>
					<span class="font-medium leading-none">mangacore integration</span>
					<span class="font-semibold leading-none">coming soon</span>
				</div>
			</div>
			<div class="flex flex-col md:gap-[0.5vw]">
				<span class="text-[1.2vw] font-semibold">sound</span>
				<div
					class="flex h-full flex-col items-center justify-center gap-[0.2vw] bg-neutral text-[1.1vw] text-accent md:rounded-[1vw]"
				>
					<span class="font-medium leading-none">soundcore integration</span>
					<span class="font-semibold leading-none">coming soon</span>
				</div>
			</div>
		</div>

		<div class="flex items-center bg-neutral md:gap-[1vw] md:rounded-[1vw] md:p-[1vw]">
			<div>
				<div class="rounded-full bg-success md:size-[0.5vw]"></div>
				<div class="rounded-full bg-error md:ml-[0.5vw] md:size-[1vw]"></div>
			</div>
			<p class="font-semibold text-accent md:text-[1vw]">
				Want even advanced searching with genres, time-ranges, tags and more? Try the <a
					href="/anime/explore"
					class="text-info underline">Explore</a
				> page
			</p>
			<div class="transform rounded-full bg-success md:size-[1.25vw] md:-translate-y-[0.5vw]"></div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
