// short links
import { goTinyCC } from './gotiny.cc.js';
import { tiyeeCN } from './tiyee.cn.js';

// default timeout
const defaultTimeout = 200;

/**
 * short link race
 * @param {*} longLink
 * @param {*} timeout
 * @param {*} info
 * @returns
 */
export const shortLinkRace = async (longLink, timeout, info) => {
  // timeout
  timeout = timeout || defaultTimeout;

  return new Promise((resolve) => {
    const errors = [];

    // tiyee.cn
    tiyeeCN(longLink, timeout, info)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        errors.push({
          name: 'tiyee.cn',
          error: e.message,
        });
      });

    // gotiny.cc
    goTinyCC(longLink, timeout, info)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        errors.push({
          name: 'gotiny.cc',
          error: e.message,
        });
      });

    // errors
    if (!info) return;
    setTimeout(() => {
      if (errors && errors.length) {
        console.log('errros:');
        console.log(errors);
      }
    }, timeout + 50);
  });
};
