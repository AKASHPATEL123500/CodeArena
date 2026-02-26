import Redis from "ioredis"

const redis = new Redis( {
    host: "127.0.0.1",
    port: 6379,
} )

redis.on( "connect", () => {
    console.log( "Redis connected successfully" );
} )

redis.on( "ready", () => {
    console.log( "Redis is ready to use" );
} )


redis.on( "error", ( err ) => {
    console.log( "Redis connection error:", err );
} )

redis.on( "close", () => {
    console.log( "Redis close successfully" );
} )

export default redis