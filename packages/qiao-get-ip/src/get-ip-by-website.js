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
  return new Promise((resolve) => {
    if (info) console.time(`get ip by ${name}`);

    get(url, {
      timeout: timeout,
    })
      .then((res) => {
        // check
        if (!res || res.status !== 200 || !res.data) {
          if (info) {
            console.timeEnd(`get ip by ${name}`);
            console.log(`get ip by ${name} failed: request failed`);
            console.log();
          }

          return;
        }

        // get ip
        const s = res.data.match(/\d+\.\d+\.\d+\.\d+/g);
        const ip = s && s.length ? s[0] : null;
        if (!ip) {
          if (info) {
            console.timeEnd(`get ip by ${name}`);
            console.log(`get ip by ${name} failed: ip match failed`);
            console.log();
          }

          return;
        }

        // is ip
        const isIp = i.v4({ exact: true }).test(ip);
        if (!isIp) {
          if (info) {
            console.timeEnd(`get ip by ${name}`);
            console.log(`get ip by ${name} failed: not ipv4 ${ip}`);
            console.log();
          }

          return;
        }

        // return
        if (info) {
          console.timeEnd(`get ip by ${name}`);
          console.log(`get ip by ${name}: ${ip}`);
          console.log();
        }
        return resolve(ip);
      })
      .catch((e) => {
        if (info) {
          console.timeEnd(`get ip by ${name}`);
          console.log(`get ip by ${name} failed: ${e.message}`);
          console.log();
        }
      });
  });
};
