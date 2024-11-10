import {Queue} from "bullmq";
import Redis from "ioredis"

const redisConnection = new Redis({
  host: procces.env.REDIS_HOST || 'localhost', 
  port: process.env.REDIS_PORT || 6379,       
});

const notificationQueue = new Queue('notifications', {
  connection: redisConnection
});

export {notificationQueue, redisConnection};