// short links
import { goTinyCC } from './gotiny.cc.js';
import { tiyeeCN } from './tiyee.cn.js';

// default timeout
const defaultTimeout = 300;

/**
 * short link race
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
export const shortLinkRace = async (longLink, timeout) => {
  // timeout
  timeout = timeout || defaultTimeout;

  return new Promise((resolve, reject) => {
    const errors = [];

    // tiyee.cn
    tiyeeCN(longLink, timeout)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        errors.push(e);
      });

    // gotiny.cc
    goTinyCC(longLink, timeout)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        errors.push(e);
      });

    // errors
    setTimeout(() => {
      if (errors && errors.length) reject(errors);
    }, timeout + 50);
  });
};
