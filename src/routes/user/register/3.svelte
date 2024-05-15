<script lang="ts">
	import CoreText from "$icons/text/core.svelte";
	import ArrowUpRight from "$icons/shapes/arrow_up_right.svelte";
	import Arrow from "$icons/shapes/arrow.svelte";
	import type { PageProps } from "./types";

	let { on_gotopage, pages_state }: PageProps = $props();

	let combined_state: { [key: string]: string } = $derived(Object.assign({}, ...Object.values(pages_state)));

	let form_is_submitable = $derived.by(() => {
		return ["username", "email"].every((item) =>
			Object.keys(combined_state).includes(item)
		);
	});

	const button_mapping = [
		{
			value: '< change email >',
			action: () => {
				on_gotopage(0);
			}
		},
		{
			value: '< change username >',
			action: () => {
				on_gotopage(1);
			}
		}
	];

	async function handle_submit() {
		console.log("Form submitted");
	// 	const res = await fetch(reverse('register-list'), {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 			'X-CSRFToken': get_csrf_token()
	// 		},
	// 		signal: AbortSignal.timeout(FETCH_TIMEOUT),
	// 		body: JSON.stringify(combined_state)
	// 	});

	// 	if (res.ok) {
	// 		goto({ url: reverse('login_view'), verb: 'GET', target: 'body' });
	// 	}
	}
</script>

<div class="flex h-full flex-col gap-10 md:gap-0 justify-between">
	<div class="flex flex-col gap-2 md:gap-1 items-start">
		<a
			href={"/anime"}
			class="btn btn-link h-max min-h-max p-0 md:gap-[0.5vw] text-base md:text-[1.25vw]"
		>
			<Arrow variant="fill" class="-rotate-90 size-4 md:size-[1.25vw]" />
			Home
		</a>
		<span class="text-lg font-bold uppercase leading-none tracking-widest text-warning md:text-[1.25vw]">
			welcome to
			<CoreText />
			project
		</span>
	</div>
	<div class="flex flex-col items-start gap-5 md:gap-[3vw]">
		<div class="flex flex-col gap-3 md:gap-[1.5vw]">
			<span class="text-primary-500 text-lg font-semibold leading-none md:text-[1.5vw]"
				>Account Summary</span
			>
			<div class="flex flex-col md:gap-[0.5vw]">
				<span class="text-lg font-medium leading-none md:text-[1.1vw]">Username:</span>
				<span
					class="text-base font-medium leading-none text-accent md:text-[1.1vw]"
					class:text-error={!combined_state.username}
				>
					{combined_state.username ?? 'not provided'}
				</span>
			</div>
			<div class="flex flex-col md:gap-[0.5vw]">
				<span class="text-lg font-medium leading-none md:text-[1.1vw]">Email:</span>
				<span
					class="text-base font-medium leading-none text-accent md:text-[1.1vw]"
					class:text-error={!combined_state.email}
				>
					{combined_state.email ?? 'not provided'}
				</span>
			</div>
		</div>
		<div class="mt-3 flex flex-col items-start gap-2 md:mt-0 md:gap-[0.5vw]">
			{#each button_mapping as item}
				<button
					class="btn btn-secondary flex h-max min-h-max flex-col items-start p-0 text-base font-semibold leading-none text-primary underline md:text-[1vw]"
					onclick={item.action}
				>
					{item.value}
				</button>
			{/each}
		</div>
	</div>
	<div class="flex items-center justify-between">
		<div class="flex flex-col gap-1 md:gap-[0.5vw]">
			<span class="text-surface-100 text-xs leading-none md:text-[0.75vw]">
				Already have an account?
			</span>
			<a
				href={"/login"}
				class="btn btn-link p-0 size-max min-h-full text-base leading-none md:text-[1.1vw]"
			>
				Login
			</a>
		</div>
		<button
			onclick={handle_submit}
			class:btn-disabled={!form_is_submitable}
			class="btn btn-primary h-max min-h-max rounded-lg p-4 text-base font-semibold leading-none text-accent md:rounded-[0.75vw] md:py-[1vw] md:px-[1.25vw] md:text-[0.95vw]"
		>
			<span>Finish</span>
			<ArrowUpRight class="w-4 rotate-45 md:w-[1vw]" />
		</button>
	</div>
</div>
