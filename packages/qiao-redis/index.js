'use strict';

var Redis = require('ioredis');
var qiao_log_js = require('qiao.log.js');

// redis
const logger = qiao_log_js.Logger('qiao-redis');

/**
 * redis
 */
var index = (options) => {
  // redis
  const redis = {};

  // client
  redis.client = new Redis(options);

  // set
  redis.set = async (key, value) => {
    if (!redis.client) return;

    try {
      return await redis.client.set(key, value);
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

module.exports = index;
