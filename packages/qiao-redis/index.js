'use strict';

var Redis = require('ioredis');
var qiao_log_js = require('qiao.log.js');

// redis
const logger = qiao_log_js.Logger('qiao-redis');

/**
 * redis
 */
var index = (options) => {
  // client
  const client = options.cluster ? new Redis.Cluster(options.clusterHosts, options.clusterOptions) : new Redis(options);

  // redis
  const redis = {};

  // set
  redis.set = async (key, value, expire) => {
    try {
      let res;
      if (expire) {
        res = await client.set(key, value, 'EX', expire);
      } else {
        res = await client.set(key, value);
      }

      return res === 'OK';
    } catch (error) {
      logger.error('redis.set', 'error', error);
    }
  };

  // del
  redis.del = async (key) => {
    try {
      return await client.del(key);
    } catch (error) {
      logger.error('redis.del', 'error', error);
    }
  };

  // get
  redis.get = async (key) => {
    try {
      return await client.get(key);
    } catch (error) {
      logger.error('redis.get', 'error', error);
    }
  };

  // cache
  redis.cache = async (key, expire, cacheFunction) => {
    try {
      // cache
      const cacheValue = await client.get(key);
      if (cacheValue) return cacheValue;

      // value
      const value = cacheFunction();
      const setRes = await client.set(key, value, expire);
      if (setRes) return value;

      // error
      logger.error('redis.cache', 'set fail');
    } catch (error) {
      logger.error('redis.cache', 'error', error);
    }
  };

  //
  return redis;
};

module.exports = index;
