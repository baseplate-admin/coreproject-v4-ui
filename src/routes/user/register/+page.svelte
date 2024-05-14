<script lang="ts">
	import type { IPagesState } from "./types";

	// Forms
	const form_first = import("./1.svelte");
	const form_second = import("./2.svelte");
	// let form_third = import('./3.svelte');

	const pages = [
		form_first,
		form_second,
		// form_third
	];
	// current page
	let page = $state.frozen(1);

	// The state of all of our pages
	let pages_state = $state<IPagesState>({});

	// Our handlers
	function handleGoToPage(go_to_page: number) {
		page = go_to_page;
	}

	function handleSubmit(data: Record<string, string | number | undefined>) {
		if (page === pages.length - 1) {
			// end of the page. do something.. Maybe seek for anime girls with stockings and leggings
			// XD
			console.log('ho ho ho, Wheres my anime girl?');
		} else {
			// If we're not on the last page, store our data and increase a step
			if (pages_state) {
				pages_state[page] = data;
				page += 1;
			}
		}
	}

	// Do some wizardy here later
	// https://github.com/sveltejs/language-tools/issues/486#issuecomment-1372330560
	let current_page: (typeof pages)[0] | undefined = $state.frozen<(typeof pages)[0]>();

	$effect(() => {
		current_page = pages[page];
	});
</script>

<!-- We display the current step here -->
<!-- We do not need skeleton loader or anything, since this is not hydratable -->
{#await current_page then Module}
	{#if Module}
		<svelte:component
			this={Module.default}
			on_gotopage={handleGoToPage}
			on_submit={handleSubmit}
			{page}
			{pages_state}
		/>
	{/if}
{/await}
