// import type { Handle } from "@sveltejs/kit";
// import { renderToString } from "@coreproject-moe/icons/hydrate";

// export const handle = (async ({ event, resolve }) => {
// 	const response = await resolve(event, {
// 		transformPageChunk: async ({ html }) => {
// 			return renderToString(html, {
// 				fullDocument: true
// 			}).then((results) => results.html ?? "");
// 		}
// 	});
// 	return response;
// }) satisfies Handle;
