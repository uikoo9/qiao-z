// ajax
import { get } from 'qiao-ajax';

// ip-regex
import i from 'ip-regex';

/**
 * get ip by website
 * @param {*} url
 * @param {*} name
 * @param {*} timeout
 * @param {*} info
 * @returns
 */
export const getIPByWebsite = (url, name, timeout, info) => {
  return new Promise((resolve, reject) => {
    if (info) console.time(`get ip by ${name}`);

    get(url, {
      timeout: timeout,
    })
      .then((res) => {
        // check
        if (!res || res.status !== 200 || !res.data) {
          if (info) console.timeEnd(`get ip by ${name}`);
          return reject(new Error(`get ip by ${name} failed: request failed`));
        }

        // is ip
        const ip = res.data.replace(/\n/g, '');
        const isIp = i.v4({ exact: true }).test(ip);
        if (!isIp) {
          if (info) console.timeEnd(`get ip by ${name}`);
          return reject(new Error(`get ip by ${name} failed: not ipv4 ${ip}`));
        }

        // return
        if (info) console.timeEnd(`get ip by ${name}`);
        return resolve(ip);
      })
      .catch((e) => {
        if (info) console.timeEnd(`get ip by ${name}`);
        reject(e);
      });
  });
};
