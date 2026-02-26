import Redis from "ioredis"

const redis = new Redis( {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT ? Number( process.env.REDIS_PORT ) : 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: process.env.REDIS_DB ? Number( process.env.REDIS_DB ) : 0,
} )

    ; ( async () => {
        try {
            const res = await redis.ping()
            console.log( "PING ->", res )
        } catch ( err ) {
            console.error( "Redis error:", err )
        } finally {
            redis.disconnect()
        }
    } )()
