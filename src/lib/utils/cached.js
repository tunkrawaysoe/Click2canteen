import { redis } from "@/lib/redis";

export async function getCachedData(key) {
  const data = await redis.get(key);
  return data;
}

export async function setCachedData(key, value, ttl = 300) {
  await redis.set(key, JSON.stringify(value), { ex: ttl }); // for ioredis
}

export async function delKey(key) {
  await redis.del(key);
}
