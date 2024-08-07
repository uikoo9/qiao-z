'use strict';

var NodeCache = require('node-cache');

// node cache

/**
 * cache
 */
const cache$1 = new NodeCache({
  stdTTL: 0,
  checkperiod: 600,
  maxKeys: -1,
  useClones: true,
  deleteOnExpire: true,
  enableLegacyCallbacks: false,
});

/**
 * set
 * @param {*} key
 * @param {*} value
 * @param {*} ttl
 */
const set = (key, value, ttl) => {
  cache$1.set(key, value, ttl || 0);
};

/**
 * get
 * @param {*} key
 * @returns
 */
const get = (key) => {
  return cache$1.get(key);
};

/**
 * del
 * @param {*} key
 */
const del = (key) => {
  cache$1.del(key);
};

// data

/**
 * cache
 * 	https://www.npmjs.com/package/node-cache
 * @param {*} key
 * @param {*} value
 * @param {*} ttl
 * @returns
 */
const cache = (key, value, ttl) => {
  // remove
  if (value === null) {
    del(key);
    return;
  }

  // get
  if (typeof value == 'undefined') {
    return get(key);
  }

  // set
  set(key, value, ttl);
};

/**
 * cacheIt
 * @param {*} cacheKey
 * @param {*} cacheFunction
 * @returns
 */
const cacheIt = async (cacheKey, cacheFunction) => {
  let item;
  const cacheItem = cache(cacheKey);
  if (!cacheItem) {
    item = await cacheFunction();
    cache(cacheKey, item);
  } else {
    item = cacheItem;
  }

  return item;
};

exports.cache = cache;
exports.cacheIt = cacheIt;
