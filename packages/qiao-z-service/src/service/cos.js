// util
import { fetch } from '../util/fetch.js';

/**
 * cosToken
 * @param {*} options
 * @returns
 */
export const cosToken = async (options) => {
  return await fetch(options.url + 'cos/token', options);
};