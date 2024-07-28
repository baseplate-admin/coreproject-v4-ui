import { createClient } from "redis";
import { env } from "$env/dynamic/private";

export const redis_client = createClient({
	url: env.REDIS_URL
});

redis_client.on("error", function (err) {
	throw new Error(err);
});

await redis_client.connect();
