<script lang="ts">
	import { z } from "zod";
	import Markdown from "$components/markdown.svelte";
	import { handle_input } from "$functions/forms/handle_input";
	import { OTP_LENGTH } from "$constants/otp";
	// import { FETCH_TIMEOUT } from "$constants/fetch";
	import { autofocus } from "$functions/forms/autofocus";
	import type { PageProps } from "./types";

	let { on_gotopage, on_submit, pages_state }: PageProps = $props();

	let combined_state: { [key: string]: string } = $derived(
		Object.assign({}, ...Object.values(pages_state))
	);

	// bind:value needs to be defined first to bind
	// otherwise shows: typeerror $.get(...) is undefined
	let username = $state({ value: "", error: new Array<string>() }),
		otp = $state({ value: "", error: new Array<string>() });

	let form_is_submitable = $derived.by(() =>
		[username, otp].every((field) => {
			return field.value && field.error.length === 0;
		})
	);

	$effect(() => {
		// update only if state exists on combined_state
		if (combined_state.username) {
			username = {
				value: combined_state.username,
				error: new Array<string>()
			};
		}
		if (combined_state.otp) {
			otp = {
				value: combined_state.otp,
				error: new Array<string>()
			};
		}
	});

	const button_mapping = [
		{
			value: `< resend code >`,
			action: () => {}
		},
		{
			value: `< change email >`,
			action: () => {
				on_gotopage(0);
			}
		}
	];

	// Functions

	const handle_username_input = async (event: Event) => {
			handle_input({
				event: event,
				schema: z
					.string()
					.min(4, "**Username** must be at least 4 characters long")
					.refine(
						(val) => /(?=.*^[a-zA-Z0-9_-]+#[0-9]{4}$)/.test(val),
						"**Username** is not valid for this regex `^[a-zA-Z0-9_-]+#[0-9]{4}$`"
					),
				error_field: username
			});

			// check username availablity
		},
		handle_otp_input = (event: Event) => {
			handle_input({
				event: event,
				schema: z
					.string()
					.refine((val) => /^\d+$/.test(val), "**OTP** must be a number")
					.refine(
						(val) => new RegExp(`^\\d{${OTP_LENGTH}}$`).test(val),
						`**OTP** must contain ${OTP_LENGTH} numbers`
					),
				error_field: otp
			});
		};

	function handle_submit() {
		on_submit({
			username: username.value,
			otp: otp.value
		});
	}
</script>

<form
	use:autofocus
	onsubmit={handle_submit}
	class="flex h-full flex-col justify-between gap-10 md:gap-0"
>
	<div class="flex flex-col items-start gap-2 md:gap-1">
		<a
			href={"/anime"}
			class="btn btn-link h-max min-h-max p-0 text-base md:gap-[0.5vw] md:text-[1.25vw]"
		>
			<coreicons-shape-arrow variant="left" class="size-4 md:size-[1.25vw]"></coreicons-shape-arrow>
			Home
		</a>
		<span
			class="text-lg font-bold uppercase leading-none tracking-widest text-warning md:text-[1.25vw]"
		>
			choose your username and verify
		</span>
	</div>
	<div class="flex flex-col gap-5 md:gap-[1.5vw]">
		<div class="flex w-full flex-col gap-[0.3rem] md:gap-[0.35vw]">
			<label for="username" class="text-lg font-semibold leading-none md:text-[1.1vw]">
				Username:
			</label>
			<input
				bind:value={username.value}
				oninput={handle_username_input}
				name="username"
				autocomplete="off"
				placeholder="Username eg: sora#4444"
				class="w-full rounded-xl border-2 border-neutral bg-transparent p-3.5 px-5 text-base font-medium leading-none outline-none !ring-0 transition-colors duration-300 placeholder:text-white/50 focus:border-primary md:rounded-[0.75vw] md:border-[0.2vw] md:px-[1.1vw] md:py-[0.8vw] md:text-[1.1vw]"
			/>
			<div class="flex items-start gap-2 text-xs leading-none md:gap-[0.5vw] md:text-[0.75vw]">
				<coreicons-shape-info class="w-3 opacity-70 md:w-[0.9vw]"></coreicons-shape-info>
				{#if username.error.length === 0}
					<span>you can change username in your user settings later, so go bonkers!</span>
				{:else}
					<Markdown class="text-error" markdown={username.error[0]} />
				{/if}
			</div>
		</div>
		<div class="flex w-full flex-col gap-[0.3rem] md:gap-[0.35vw]">
			<label for="otp" class="text-lg font-semibold leading-none md:text-[1.1vw]"> OTP: </label>
			<input
				bind:value={otp.value}
				oninput={handle_otp_input}
				name="otp"
				placeholder="One Time Password"
				class="w-full rounded-xl border-2 border-neutral bg-transparent p-3.5 px-5 text-base font-medium leading-none outline-none !ring-0 transition-colors duration-300 placeholder:text-white/50 focus:border-primary md:rounded-[0.75vw] md:border-[0.2vw] md:px-[1.1vw] md:py-[0.8vw] md:text-[1.1vw]"
			/>
			<div class="flex items-start gap-2 text-xs leading-none md:gap-[0.5vw] md:text-[0.75vw]">
				<coreicons-shape-info class="w-3 opacity-70 md:w-[0.9vw]"></coreicons-shape-info>
				{#if otp.error.length === 0}
					<span>
						if you didn’t receive the code, check your spam folder. Or use the resend button
					</span>
				{:else}
					<Markdown class="text-error" markdown={otp.error[0]} />
				{/if}
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
			<span class="text-xs leading-none md:text-[0.75vw]"> Already have an account? </span>
			<a
				href={"/login"}
				class="btn btn-link size-max min-h-full p-0 text-base leading-none md:text-[1.1vw]"
			>
				Login
			</a>
		</div>
		<button
			type="submit"
			class:btn-disabled={!form_is_submitable}
			class="btn btn-primary h-max min-h-max rounded-lg p-4 text-base font-semibold leading-none text-accent md:rounded-[0.75vw] md:px-[1.25vw] md:py-[1vw] md:text-[0.95vw]"
		>
			<span>Continue</span>
			<coreicons-shape-arrow variant="right" class="w-4 md:w-[1vw]"></coreicons-shape-arrow>
		</button>
	</div>
</form>
