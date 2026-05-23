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

/**
 * userInfo
 * @param {*} options
 * @returns
 */
export const userInfo = async (options) => {
  return await fetch(options.url + 'user/info', options);
};

/**
 * userSearch
 * @param {*} options
 * @returns
 */
export const userSearch = async (options) => {
  return await fetch(options.url + 'user/search', options);
};

/**
 * userGithub
 * @param {*} options
 * @returns
 */
export const userGithub = async (options) => {
  return await fetch(options.url + 'user/github', options);
};

/**
 * userGoogle
 * @param {*} options
 * @returns
 */
export const userGoogle = async (options) => {
  return await fetch(options.url + 'user/google', options);
};
