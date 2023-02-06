// get ip by website
import { getIPByWebsite } from './get-ip-by-website.js';

// websites
const websites = [
  {
    name: 'sohu.com',
    url: 'http://txt.go.sohu.com/ip/soip',
  },
  {
    name: 'insistime.com',
    url: 'https://insistime.com/ip?type=api',
  },
  {
    name: 'ipify.org',
    url: 'https://api.ipify.org/',
  },
  {
    name: 'icanhazip.com',
    url: 'https://icanhazip.com/',
  },
  {
    name: 'ipinfo.io',
    url: 'https://ipinfo.io/ip',
  },
  {
    name: 'ifconfig.me',
    url: 'https://ifconfig.me/ip',
  },
  {
    name: 'amazonaws.com',
    url: 'https://checkip.amazonaws.com/',
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
      if (errors && errors.length) {
        console.log('errros:');
        console.log(errors);
      }
    }, timeout + 50);
  });
};
