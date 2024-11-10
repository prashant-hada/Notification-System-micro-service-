import {Queue} from "bullmq";
import Redis from "ioredis"

const redisConnection = new Redis({
  host: 'localhost', // Replace with your Redis host if needed
  port: 6379,        // Replace with your Redis port if needed
});

const notificationQueue = new Queue('notifications', {
  connection: redisConnection
});

export {notificationQueue, redisConnection};