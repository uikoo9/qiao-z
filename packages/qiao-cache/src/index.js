// data
import { set, get, del } from './_data.js';

/**
 * cache
 * 	https://www.npmjs.com/package/node-cache
 * @param {*} key
 * @param {*} value
 * @returns
 */
export const cache = (key, value) => {
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

/**
 * cacheIt
 * @param {*} cacheKey
 * @param {*} cacheFunction
 * @returns
 */
export const cacheIt = async (cacheKey, cacheFunction) => {
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
