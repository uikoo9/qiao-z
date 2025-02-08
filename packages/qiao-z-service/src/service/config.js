// util
import { fetch } from '../util/fetch.js';

/**
 * config
 * @param {*} options
 * @returns
 */
export const config = async (options) => {
  return await fetch(options.url + 'config', options);
};
