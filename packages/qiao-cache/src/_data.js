// node cache
import NodeCache from 'node-cache';

/**
 * cache
 */
export const cache = new NodeCache({
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
export const set = (key, value) => {
  cache.set(key, value);
};

/**
 * get
 * @param {*} key
 * @returns
 */
export const get = (key) => {
  return cache.get(key);
};

/**
 * del
 * @param {*} key
 */
export const del = (key) => {
  cache.del(key);
};
