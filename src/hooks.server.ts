import type { Handle } from "@sveltejs/kit";
import { renderToString } from "@coreproject-moe/hydrate";

export const handle = (async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: async ({ html }) => {
			return renderToString(html, {
				prettyHtml: true,
				removeScripts: false
			}).then((results) => results.html);
		}
	});
	return response;
}) satisfies Handle;
