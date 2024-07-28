import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { get_color_thief } from "color-thief-wasm";
import undici from "undici";
import sharp from "sharp";
import { redis_client } from "$lib/server/redis";

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	if(redis_client){
		const value = await redis_client.get(url.pathname);
		
		if(value) { 
			const data = JSON.parse(value) as {colors:number[],avif_image_buffer:Uint8Array};
			return new Response(JSON.stringify({ colors: data.colors, image: data.avif_image_buffer }))
		}
	}

	try {
		const image_url = url.searchParams.get("url");
		if (!image_url) throw new Error(`There must be an "url" param`);

		const { statusCode, body } = await undici.request(image_url);
		if (statusCode != 200) throw new Error(`The image returned ${statusCode}`);

		const image_buffer = new Uint8Array(await body.arrayBuffer());
		const colors = get_color_thief(image_buffer, 64 * 64, 10, 5) as Array<number>;

		const avif_image_buffer = await sharp(image_buffer).avif({ effort: 9 }).toBuffer();

		const data = { colors: colors, image: avif_image_buffer};

		if(redis_client){
			await redis_client.set(url.pathname,JSON.stringify(data));
		}

		setHeaders({
			"Content-Type": "application/json"
		});
		return new Response(JSON.stringify(data));
	} catch (e) {
		error(400, String(e));
	}
};
