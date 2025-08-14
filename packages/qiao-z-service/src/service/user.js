// util
import { fetch } from '../util/fetch.js';

/**
 * userLogin
 * @param {*} options
 * @returns
 */
export const userLogin = async (options) => {
  return await fetch(options.url + 'user/login', options);
};

/**
 * userCheck
 * @param {*} options
 * @param {*} headers
 * @returns
 */
export const userCheck = async (options, headers) => {
  return await fetch(options.url + 'user/check', options, headers);
};
