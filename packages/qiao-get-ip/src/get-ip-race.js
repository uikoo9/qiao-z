// get ip by website
import { getIPByWebsite } from './get-ip-by-website.js';

// websites
const websites = [
  {
    name: 'ipify.org',
    url: 'https://api.ipify.org/',
  },
  {
    name: 'icanhazip.com',
    url: 'https://icanhazip.com/',
  },
  {
    name: 'insistime.com',
    url: 'https://insistime.com/ip?type=api',
  },
];

// default timeout
const defaultTimeout = 200;

/**
 * get ip race
 * @param {*} timeout
 * @param {*} info
 * @returns
 */
export const getIPRace = (timeout, info) => {
  // timeout
  timeout = timeout || defaultTimeout;

  return new Promise((resolve) => {
    const errors = [];

    websites.forEach((website) => {
      getIPByWebsite(website.url, website.name, timeout, info)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          errors.push({
            name: website.name,
            error: e.message,
          });
        });
    });

    // errors
    if (!info) return;
    setTimeout(() => {
      if (errors && errors.length) console.log(errors);
    }, timeout + 50);
  });
};
