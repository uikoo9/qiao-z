// qs
import { stringify } from 'qs';

// qiao-ajax
import { post } from 'qiao-ajax';

/**
 * tiyee.cn
 * @param {*} longLink
 * @param {*} timeout
 * @param {*} info
 * @returns
 */
export const tiyeeCN = async (longLink, timeout, info) => {
  // time
  const timeStr = 'short link by tiyee.cn';
  if (info) console.time(timeStr);

  // check
  if (!longLink) {
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} failed: need long link`);
      console.log();
    }

    return;
  }

  // url
  const url = 'https://tiyee.cn/2/create_short_url';

  // config
  const config = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: stringify({ url: longLink }),
    timeout,
  };

  // post
  try {
    const res = await post(url, config);
    if (!res || res.status !== 200 || !res.data) {
      if (info) {
        console.timeEnd(timeStr);
        console.log(`${timeStr} failed: request failed`);
        console.log();
      }

      return;
    }

    // return
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} success: https://${res.data.short_url}`);
      console.log();
    }
    return `https://${res.data.short_url}`;
  } catch (error) {
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} failed: ${error.message}`);
      console.log();
    }
  }
};
