<script lang="ts">
	import type { ComponentType } from 'svelte';

	// Forms
	let form_first = import('./1.svelte');
	// let form_second = import('./2.svelte');
	// let form_third = import('./3.svelte');

	let pages = [
		form_first
		// form_second,
		// form_third
	];
	// current page
	let page = $state(0);

	// The state of all of our pages
	let pages_state = $state<{
		[key: number]: Record<string, string | number>;
	}>(new Array<{}>());

	// Our handlers
	function goToPage(e: CustomEvent) {
		page = e.detail.page;
	}

	function handleSubmit(e: CustomEvent) {
		if (page === pages.length - 1) {
			// end of the page. do something.. Maybe seek for anime girls with stockings and leggings
			// XD
			console.log('ho ho ho, Wheres my anime girl?');
		} else {
			// If we're not on the last page, store our data and increase a step
			if (pages_state) {
				pages_state[page] = e.detail;
				page += 1;
			}
		}
	}

	// Do some wizardy here later
	// https://github.com/sveltejs/language-tools/issues/486#issuecomment-1372330560
	let current_page: (typeof pages)[0] | undefined = $state<(typeof pages)[0]>();

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
			on:go_to_page={goToPage}
			on:submit={handleSubmit}
			{pages_state}
			{page}
		/>
	{/if}
{/await}
