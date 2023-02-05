// get ip race
import { getIPRace } from './get-ip-race.js';

/**
 * get ip
 * @param {*} options
 * @returns
 */
export const getIP = (options) => {
  options = options || {};
  return getIPRace(options.timeout, options.info);
};
