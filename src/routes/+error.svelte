<script lang="ts">
	import { page } from '$app/stores';
	import Discord from '$icons/logos/discord.svelte';
	import Github from '$icons/logos/github.svelte';
	import Reddit from '$icons/logos/reddit.svelte';
	import Info from '$icons/shapes/info.svelte';
</script>

<main class="h-dvh md:w-[60%] p-5 md:p-0 md:mx-auto relative flex flex-col-reverse md:flex-row flex-col items-center justify-center md:justify-between gap-10 md:gap-[2vw]">
	<div class="flex flex-col gap-7 md:gap-[2vw]">
		<h2 class="text-6xl md:text-[5vw] font-bold text-accent">{$page.status}</h2>
		{#if $page.status === 404}
			<div class="flex flex-col gap-1 md:gap-[1vw]">
				<h4 class="text-accent text-xl md:text-[1.5vw] font-bold">Page not found</h4>
				<p class="md:text-[1.1vw]">This page may have been moved, deleted, or perhaps <br> never existed at all.</p>
			</div>
		{/if}
		<div class="flex items-center gap-3 md:gap-[2vw]">
			<a href="/" target="_blank" class="btn !bg-transparent min-h-max h-max p-0">
				<Reddit class="size-6 md:size-[1.75vw] text-warning" />
			</a>
			<a href="/" target="_blank" class="btn !bg-transparent min-h-max h-max p-0">
				<Discord class="size-6 md:size-[1.75vw] text-warning" />
			</a>
			<a href="/" target="_blank" class="btn !bg-transparent min-h-max h-max p-0">
				<Github class="size-6 md:size-[1.75vw] text-warning" />
			</a>
		</div>
		<div class="flex flex-col gap-3 md:gap-[1vw]">
			<div class="flex items-center gap-1.5 md:gap-[0.5vw]">
				<span class="text-accent md:text-[1.25vw] font-semibold">Quick Links</span>
				<Info class="md:size-[1vw] size-4" />
			</div>
			<div class="flex items-center gap-3 md:gap-[1vw] [&>a]:btn-link text-sm md:text-[1vw] flex-wrap leading-none">
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
		<span class="absolute bottom-5 left-5 md:bottom-[2vw] md:left-0 text-xs md:text-[1vw]">© coreproject 2024. Few rights reserved.</span>
	</div>
	<div class="flex flex-col items-center gap-3 md:gap-[2vw]">
		<img
			src="/images/mascots/raiden_1.png"
			class="w-40 md:w-[20vw]"
			alt=""
		/>
		<span class="md:text-[1vw] text-warning italic">Zoro... did you lose your way again?</span>
	</div>
</main>