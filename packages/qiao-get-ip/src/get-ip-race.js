// get ip by website
import { getIPByWebsite } from './get-ip-by-website.js';

// websites
const websites = [
  'http://txt.go.sohu.com/ip/soip',
  'https://api.ipify.org/',
  'https://icanhazip.com/',
  'https://ipinfo.io/ip',
  'https://ifconfig.me/ip',
  'https://checkip.amazonaws.com/',
];

// default timeout
const defaultTimeout = 300;

/**
 * get ip race
 * @param {*} timeout
 * @returns
 */
export const getIPRace = (timeout) => {
  // timeout
  timeout = timeout || defaultTimeout;

  return new Promise((resolve, reject) => {
    const errors = [];

    websites.forEach((url) => {
      getIPByWebsite(url, timeout)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          errors.push(e);
        });
    });

    // errors
    setTimeout(() => {
      if (errors && errors.length) reject(errors);
    }, timeout + 50);
  });
};
