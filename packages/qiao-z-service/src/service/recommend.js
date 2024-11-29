// util
import { fetch } from '../util/fetch.js';

/**
 * addRecommend
 * @param {*} options
 * @returns
 */
export const addRecommend = async (options) => {
  return await fetch(options.url + 'recommend/add', options);
};

/**
 * listRecommend
 * @param {*} options
 * @returns
 */
export const listRecommend = async (options) => {
  return await fetch(options.url + 'recommend/list', options);
};

/**
 * changeRecommend
 * @param {*} options
 * @returns
 */
export const changeRecommend = async (options) => {
  return await fetch(options.url + 'recommend/change', options);
};
