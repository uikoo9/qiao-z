'use strict';

var qiaoAjax = require('qiao-ajax');

const word = '[a-fA-F\\d:]';

const boundry = options => options && options.includeBoundaries
	? `(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))`
	: '';

const v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';

const v6segment = '[a-fA-F\\d]{1,4}';

const v6 = `
(?:
(?:${v6segment}:){7}(?:${v6segment}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6segment}:){6}(?:${v4}|:${v6segment}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6segment}:){5}(?::${v4}|(?::${v6segment}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6segment}:){4}(?:(?::${v6segment}){0,1}:${v4}|(?::${v6segment}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6segment}:){3}(?:(?::${v6segment}){0,2}:${v4}|(?::${v6segment}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6segment}:){2}(?:(?::${v6segment}){0,3}:${v4}|(?::${v6segment}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6segment}:){1}(?:(?::${v6segment}){0,4}:${v4}|(?::${v6segment}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::${v6segment}){0,5}:${v4}|(?::${v6segment}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`.replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

// Pre-compile only the exact regexes because adding a global flag make regexes stateful
const v46Exact = new RegExp(`(?:^${v4}$)|(?:^${v6}$)`);
const v4exact = new RegExp(`^${v4}$`);
const v6exact = new RegExp(`^${v6}$`);

const ipRegex = options => options && options.exact
	? v46Exact
	: new RegExp(`(?:${boundry(options)}${v4}${boundry(options)})|(?:${boundry(options)}${v6}${boundry(options)})`, 'g');

ipRegex.v4 = options => options && options.exact ? v4exact : new RegExp(`${boundry(options)}${v4}${boundry(options)}`, 'g');
ipRegex.v6 = options => options && options.exact ? v6exact : new RegExp(`${boundry(options)}${v6}${boundry(options)}`, 'g');

// ajax

/**
 * get ip by website
 * @param {*} url
 * @param {*} timeout
 * @returns
 */
const getIPByWebsite = (url, timeout) => {
  return new Promise((resolve, reject) => {
    qiaoAjax.get(url, {
      timeout: timeout,
    })
      .then((res) => {
        // check
        if (!res || res.status !== 200 || !res.data) return;

        // get ip
        const s = res.data.match(/\d+\.\d+\.\d+\.\d+/g);
        const ip = s && s.length ? s[0] : null;
        if (!ip) return;

        // is ip
        const isIp = ipRegex.v4({ exact: true }).test(ip);
        if (!isIp) return;

        // return
        return resolve(ip);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

// get ip by website

// websites
const websites = [
  'http://txt.go.sohu.com/ip/soip',
  'https://insistime.com/ip?type=api',
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
const getIPRace = (timeout) => {
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

// get ip race

/**
 * get ip
 * @param {*} timeout
 * @returns
 */
const getIP = (timeout) => {
  return getIPRace(timeout);
};

exports.getIP = getIP;
