// short link
import { shortLinkRace } from './short-link-race.js';

/**
 * short link
 * @param {*} longLink
 * @param {*} options
 * @returns
 */
export const shortLink = (longLink, options) => {
  options = options || {};
  return shortLinkRace(longLink, options.timeout, options.info);
};
