import { COLORTHIEF_MAX_ENTRIES } from "$constants/lru";
import QuickLRU from "quick-lru";

export const color_mapping = $state(
	new QuickLRU<
		String,
		{
			color_palette: number[][];
			dominant_color: string;
			dominant_foreground_color: string;
		}
	>({ maxSize: COLORTHIEF_MAX_ENTRIES })
);
