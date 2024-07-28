import { createClient } from 'redis'
import { env } from '$env/dynamic/private';

export const redis_client = createClient({
    url: env.REDIS_URL,
    socket: {
        tls: true,
    },
})

redis_client.on("error", function (err) {
    return new Response(JSON.stringify({ err }))
})

await redis_client.connect()