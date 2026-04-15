import { RedisOptions } from "ioredis";

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379", 10),
      password: process.env.REDIS_PASSWORD || undefined,
    },
  },
  driver: "redis",
} as ICacheConfig;
