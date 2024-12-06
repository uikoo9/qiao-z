// util
import { fetch } from '../util/fetch.js';

/**
 * appUpdate
 * @param {*} options
 * @returns
 */
export const appUpdate = async (options) => {
  return await fetch(options.url + 'app/update', options);
};
