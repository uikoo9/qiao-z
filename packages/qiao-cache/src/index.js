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
