<script lang="ts">
	import { page } from "$app/stores";
	import { DISCORD_LINK, REDDIT_LINK, GITHUB_LINK } from "$constants/social";
</script>

<main
	class="relative flex h-dvh flex-col-reverse items-center justify-center gap-10 p-5 md:mx-auto md:w-[60%] md:flex-row md:justify-between md:gap-[2vw] md:p-0"
>
	<div class="flex flex-col gap-7 md:gap-[2vw]">
		<h2 class="text-6xl font-bold text-accent md:text-[5vw]">{$page.status}</h2>
		{#if $page.status === 404}
			<div class="flex flex-col gap-1 md:gap-[1vw]">
				<h4 class="text-xl font-bold text-accent md:text-[1.5vw]">Page not found</h4>
				<p class="md:text-[1.1vw]">
					This page may have been moved, deleted, or perhaps <br /> never existed at all.
				</p>
			</div>
		{/if}
		<div class="flex items-center gap-3 md:gap-[2vw]">
			<a href={REDDIT_LINK} target="_blank" class="btn h-max min-h-max !bg-transparent p-0">
				<coreicons-logo-reddit class="size-6 text-warning md:size-[1.75vw]"></coreicons-logo-reddit>
			</a>
			<a href={DISCORD_LINK} target="_blank" class="btn h-max min-h-max !bg-transparent p-0">
				<coreicons-logo-discord class="size-6 text-warning md:size-[1.75vw]"
				></coreicons-logo-discord>
			</a>
			<a href={GITHUB_LINK} target="_blank" class="btn h-max min-h-max !bg-transparent p-0">
				<coreicons-logo-github class="size-6 text-warning md:size-[1.75vw]"></coreicons-logo-github>
			</a>
		</div>
		<div class="flex flex-col gap-3 md:gap-[1vw]">
			<div class="flex items-center gap-1.5 md:gap-[0.5vw]">
				<span class="font-semibold text-accent md:text-[1.25vw]">Quick Links</span>
				<coreicons-shape-info class="size-4 md:size-[1vw]"></coreicons-shape-info>
			</div>
			<div
				class="flex flex-wrap items-center gap-3 text-sm leading-none [&>a]:btn-link md:gap-[1vw] md:text-[1vw]"
			>
				<a href="/anime">/anime</a>
				<a href="/trending">/trending</a>
				<a href="/latest">/latest</a>
				<a href="/forum">/forum</a>
				<a href="/schedule">/schedule</a>
				<a href="/settings">/settings</a>
				<a href="/account">/account</a>
				<a href="/help">/help</a>
			</div>
		</div>
		<span class="absolute bottom-5 left-5 text-xs md:bottom-[2vw] md:left-0 md:text-[1vw]"
			>© coreproject 2024. Few rights reserved.</span
		>
	</div>
	<div class="flex flex-col items-center gap-3 md:gap-[2vw]">
		<img src="/images/mascots/raiden_1.png" class="w-40 md:w-[20vw]" alt="" />
		<span class="italic text-warning md:text-[1vw]">Zoro... did you lose your way again?</span>
	</div>
</main>
