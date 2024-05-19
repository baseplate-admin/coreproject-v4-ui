import { locales } from '$lib/translations';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  const defined_locales = locales.get();
  const paths = [...defined_locales, ''];
  const slash_paths = paths.map((l) => `${l}/`);

  return [...paths, ...slash_paths].includes(param);
}
