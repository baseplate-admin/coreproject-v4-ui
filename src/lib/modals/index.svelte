<script lang="ts">
	import { createModalStore } from "$stores/modals.svelte";
	import SearchModal from "./search_modal.svelte";

	const modal_store = createModalStore();

	$inspect(modal_store.state);
</script>

{#if modal_store.get_modal_state("search")}
	gell
	<SearchModal />
{/if}
