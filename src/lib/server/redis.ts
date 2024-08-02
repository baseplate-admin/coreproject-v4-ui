import { createClient } from "redis";
import { env } from "$env/dynamic/private";

export const redis_client = await createClient({
	url: env.REDIS_URL ?? undefined,
	socket: {
		tls: env.REDIS_TLS === "true"
	}
})
	.on("error", (err) => console.log(err))
	.connect();
