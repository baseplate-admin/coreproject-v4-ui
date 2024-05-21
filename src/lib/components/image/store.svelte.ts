import { COLORTHIEF_MAX_ENTRIES } from "$constants/lru";
import QuickLRU from "quick-lru";

export let color_mapping = $state<QuickLRU<String, number[][]>>(
	new QuickLRU<String, number[][]>({ maxSize: COLORTHIEF_MAX_ENTRIES })
);
