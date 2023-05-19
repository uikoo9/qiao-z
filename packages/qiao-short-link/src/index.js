// short link
import { shortLinkRace } from './short-link-race.js';

/**
 * short link
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
export const shortLink = (longLink, timeout) => {
  return shortLinkRace(longLink, timeout);
};
