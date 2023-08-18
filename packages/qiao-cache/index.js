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
 */
const set = (key, value) => {
  cache$1.set(key, value);
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
 * @returns
 */
const cache = (key, value) => {
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
  set(key, value);
};

exports.cache = cache;
