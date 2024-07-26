<script lang="ts">
	import { z } from "zod";
	import { handle_input } from "$functions/forms/handle_input";
	import { autofocus } from "$functions/forms/autofocus";
	import { createAuthStore } from "$stores/auth.svelte";
	import Info from "$icons/shapes/info.svelte";
	import Markdown from "$components/markdown.svelte";
	import ArrowUpRight from "$icons/shapes/arrow_up_right.svelte";
	import Arrow from "$icons/shapes/arrow.svelte";

	const auth_store = createAuthStore();

	let username_or_email = $state({
			value: "",
			error: new Array<string>()
		}),
		password = $state({
			value: "",
			error: new Array<string>()
		});

	let form_is_submitable = $derived.by(() =>
		[username_or_email, password].every((field) => {
			return field.value && field.error.length === 0;
		})
	);

	const handle_username_input = (event: Event) => {
			handle_input({
				event,
				schema: z.string().min(1, "Please enter a **Email address** or **Username**"),
				error_field: username_or_email
			});
		},
		handle_password_input = (event: Event) => {
			handle_input({
				event,
				schema: z.string().min(1, "**Password** can't be empty"),
				error_field: password
			});
		};

	const handle_submit = async () => {
		console.log("submit form!");
	};
</script>

{#if auth_store.state}
	<div class="flex h-full flex-col items-start justify-center gap-[2vw]">
		<div
			class="flex items-center text-base font-bold uppercase leading-none tracking-widest text-white md:text-[1.5vw]"
		>
			welcome back
			<!-- Show request.user -->
		</div>
		<div>
			Perhaps you meant to
			<a
				href="/logout"
				onclick={() => {}}
				class="text-base leading-none text-primary underline md:text-[1.1vw]"
			>
				logout
			</a>
			?
		</div>
	</div>
{:else}
	<form
		use:autofocus
		onsubmit={async (event) => {
			event.preventDefault();
			handle_submit();
		}}
		class="flex h-full flex-col justify-between gap-10 md:gap-0"
	>
		<div class="flex flex-col items-start gap-2 md:gap-1">
			<a
				href={"/anime"}
				class="btn btn-link h-max min-h-max p-0 text-base md:gap-[0.5vw] md:text-[1.25vw]"
			>
				<Arrow variant="fill" class="size-4 -rotate-90 md:size-[1.25vw]" />
				Home
			</a>
			<span
				class="flex items-center text-lg font-bold uppercase leading-none tracking-widest text-warning md:text-[1.5vw]"
				>hey there! let's login
			</span>
		</div>

		<div class="flex flex-col gap-5 md:block">
			<div class="flex flex-col gap-2 md:gap-[0.5vw]">
				<label for="username" class="text-base font-semibold leading-none md:text-[1.1vw]">
					Email address / Username:
				</label>
				<input
					bind:value={username_or_email.value}
					oninput={(event) => handle_username_input(event)}
					placeholder="sora_amamiya@coreproject.moe / soraamamiya#0001"
					class="w-full rounded-xl border-2 border-neutral bg-transparent p-3.5 px-5 text-base font-medium leading-none outline-none !ring-0 transition-colors duration-300 placeholder:text-white/50 focus:border-primary md:rounded-[0.75vw] md:border-[0.2vw] md:px-[1.1vw] md:py-[0.8vw] md:text-[1.1vw]"
				/>
				<div
					class="flex items-center gap-2 text-[0.7rem] leading-none md:gap-[0.5vw] md:text-[0.8vw]"
				>
					<Info class="w-3 opacity-70 md:w-[0.9vw]" />
					{#if username_or_email.error.length}
						<Markdown class="text-error" markdown={username_or_email.error.join("")} />
					{:else}
						<span>we’ll send you a verification email, so please ensure it’s active</span>
					{/if}
				</div>
			</div>
			<div class="flex flex-col gap-[0.3rem] md:mt-[1.5vw] md:gap-[0.5vw]">
				<label for="username" class="text-base font-semibold leading-none md:text-[1.1vw]">
					Password:
				</label>
				<div class="relative flex flex-col">
					<input
						bind:value={password.value}
						oninput={(event) => handle_password_input(event)}
						placeholder="enter your existing password"
						class="w-full rounded-xl border-2 border-neutral bg-transparent p-3.5 px-5 text-base font-medium leading-none outline-none !ring-0 transition-colors duration-300 placeholder:text-white/50 focus:border-primary md:rounded-[0.75vw] md:border-[0.2vw] md:px-[1.1vw] md:py-[0.8vw] md:text-[1.1vw]"
					/>
				</div>
				<div
					class="text-surface-300 flex items-center gap-2 text-[0.7rem] leading-none md:gap-[0.5vw] md:text-[0.8vw]"
				>
					<Info class="w-3 opacity-70 md:w-[0.9vw]" />
					{#if password.error.length}
						<Markdown class="text-error" markdown={password.error.join("")} />
					{:else}
						<span>enter password of your account</span>
					{/if}
				</div>
			</div>
			<button
				class="btn btn-secondary flex h-max min-h-max flex-col items-start p-0 text-start text-base font-semibold leading-none text-primary underline md:mt-[2vw] md:text-[1vw]"
			>
				&lt; forgot password? &gt;
			</button>
		</div>

		<div class="flex items-center justify-between">
			<div class="flex flex-col gap-1 md:gap-[0.5vw]">
				<span class="text-surface-100 text-xs leading-none md:text-[0.75vw]"
					>Don't have a core account?</span
				>
				<a
					href="./register"
					class="btn btn-link size-max min-h-full p-0 text-base leading-none md:text-[1.1vw]"
				>
					Register
				</a>
			</div>
			<button
				type="submit"
				class:btn-disabled={!form_is_submitable}
				class="btn btn-primary h-max min-h-max rounded-lg p-4 text-base font-semibold leading-none text-accent md:rounded-[0.75vw] md:px-[1.25vw] md:py-[1vw] md:text-[0.95vw]"
			>
				<span>Continue</span>
				<ArrowUpRight class="w-4 rotate-45 md:w-[1vw]" />
			</button>
		</div>
	</form>
{/if}
