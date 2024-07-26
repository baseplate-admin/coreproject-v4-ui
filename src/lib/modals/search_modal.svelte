<script lang="ts">
	import { createModalStore } from "$stores/modals.svelte";

	// Icon imports

	import Search from "$icons/shapes/search.svelte";
	import Cross from "$icons/shapes/cross.svelte";
	import Circle from "$icons/shapes/circle.svelte";
	import Chevron from "$icons/shapes/chevron.svelte";

	const modal_store = createModalStore();

	let search_query = $state("");

	// Bindings
	let dialog_element: HTMLDialogElement | null = null;

	const handle_search_key_down = async () => {
			if (!dialog_element?.open) return;
		},
		handle_input = async () => {
			// search_promise = search_query === "" ? null : get_anime_with_serach_parameters();
		},
		handle_close = async () => {
			modal_store.close_modal("search");
		};

	// const get_anime_with_serach_parameters = async () => {
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
	// };
	// let search_promise: Promise<Anime[]> | null = null;

	$effect(() => {
		if (modal_store.state.get("search")) {
			dialog_element?.showModal();
		}
	});
</script>

<svelte:window onkeyup={() => dialog_element?.open} />

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
				<div class="flex h-full flex-col bg-neutral md:rounded-[1vw] md:p-[1vw]">
					<div class="flex flex-col md:gap-[1vw]">
						{#each { length: 2 } as _}
							<a href="/anime/mal/1" class="group flex items-center md:gap-[1vw]">
								<img
									src="/images/mock/cover/one_piece.webp"
									alt=""
									class="object-cover md:size-[4vw] md:rounded-[1vw]"
								/>
								<div class="flex flex-col md:gap-[0.2vw]">
									<h3 class="font-bold text-accent group-hover:text-info md:text-[1vw]">
										One Piece
									</h3>
									<div class="flex items-center font-medium md:gap-[0.5vw] md:text-[0.8vw]">
										<span>1996</span>
										<span>TV</span>
										<Circle class="md:size-[0.25vw]" />
										<span>1009 eps</span>
									</div>
								</div>
							</a>
						{/each}
					</div>
					<a
						href="/anime/explore?name=one-piece"
						class="mt-auto flex items-center self-center text-info md:gap-[0.5vw]"
					>
						<span class="font-semibold md:text-[1vw]">view all</span>
						<Chevron class="-rotate-90 md:size-[1vw]" />
					</a>
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
