<script lang="ts">
	import { page } from '$app/stores';
	import Info from '$icons/shapes/info.svelte';
</script>

<main class="h-dvh relative flex items-center justify-center md:gap-[5vw]">
	<div class="flex flex-col md:gap-[2vw]">
		<h2 class="md:text-[6vw] font-bold text-accent">{$page.status}</h2>
		{#if $page.status === 404}
			<div class="flex flex-col md:gap-[1vw]">
				<h4 class="text-accent md:text-[1.75vw] font-bold">Page not found</h4>
				<p class="md:text-[1.25vw]">This page may have been moved, deleted, or perhaps <br> never existed at all.</p>
			</div>
		{/if}
		<div class="flex flex-col md:gap-[1vw]">
			<div class="flex items-center md:gap-[0.5vw]">
				<span class="text-accent md:text-[1.25vw] font-semibold">Quick Links</span>
				<Info class="md:size-[1vw]" />
			</div>
			<div class="flex items-center md:gap-[1vw] [&>a]:btn-link [&>a]:md:text-[1vw]">
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
	</div>
	<div class="flex flex-col items-center md:gap-[2vw]">
		<img
			src="/images/mascots/raiden_1.png"
			class="md:w-[20vw]"
			alt=""
		/>
		<span class="md:text-[1vw] text-warning italic">Zoro... did you lose your way again?</span>
	</div>
</main>