import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { get_color_thief } from "color-thief-wasm";
import undici from "undici";

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	try {
		const image_url = url.searchParams.get("url");
		if (!image_url) throw new Error(`There must be an "url" param`);

		const { statusCode, body } = await undici.request(image_url);
		if (statusCode != 200) throw new Error(`The image returned ${statusCode}`);

		const image_buffer = new Uint8Array(await body.arrayBuffer());
		const colors = get_color_thief(image_buffer, 64 * 64, 10, 5) as Array<number>;

		setHeaders({
			"Content-Type": "application/json"
		});
		return new Response(JSON.stringify({ colors: colors, image: image_buffer }));
	} catch (e) {
		error(400, String(e));
	}
};
