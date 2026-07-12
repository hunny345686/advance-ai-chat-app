import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on("connect",()=>console.log("redis connected"))
redis.on("error",()=>console.log("redis error"))