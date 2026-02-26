import Redis from "ioredis"

const redis = new Redis( process.env.REDIS_URL, {
    retryStrategy( times ) {
        if ( times > 3 ) return null
        return Math.min( times * 500, 2000 )
    }
} )

redis.on( "connect", () => console.log( "Redis connected successfully" ) )
redis.on( "ready", () => console.log( "Redis is ready to use" ) )
redis.on( "error", ( err ) => console.log( "Redis connection error:", err ) )
redis.on( "close", () => console.log( "Redis close successfully" ) )

export default redis