// redis
import Redis from 'ioredis';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-redis');

/**
 * redis
 */
export default (options) => {
  // redis
  const redis = {};

  // client
  redis.client = () => {
    if (options.cluster) {
      return new Redis.Cluster(options.clusterHosts, options.clusterOptions);
    } else {
      return new Redis(options);
    }
  };

  // set
  redis.set = async (key, value, expire) => {
    if (!redis.client) return;

    try {
      let res;
      if (expire) {
        res = await redis.client.set(key, value, 'EX', expire);
      } else {
        res = await redis.client.set(key, value);
      }

      return res === 'OK';
    } catch (error) {
      logger.error('redis.set', 'error', error);
    }
  };

  // get
  redis.get = async (key) => {
    if (!redis.client) return;

    try {
      return await redis.client.get(key);
    } catch (error) {
      logger.error('redis.get', 'error', error);
    }
  };

  // del
  redis.del = async (key) => {
    if (!redis.client) return;

    try {
      return await redis.client.del(key);
    } catch (error) {
      logger.error('redis.del', 'error', error);
    }
  };

  //
  return redis;
};
