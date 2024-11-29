// util
import { fetch } from '../util/fetch.js';

/**
 * sendSms
 * @param {*} options
 * @returns
 */
export const sendSms = async (options) => {
  return await fetch(options.url, options);
};
