// qiao-ajax
import { post } from 'qiao-ajax';

/**
 * gotiny.cc
 * @param {*} longLink
 * @param {*} timeout
 * @param {*} info
 * @returns
 */
export const goTinyCC = async (longLink, timeout, info) => {
  // time
  const timeStr = 'short link by gotiny.cc';
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
  const url = 'https://gotiny.cc/api';

  // config
  const config = {
    headers: { 'content-type': 'application/json' },
    data: { input: longLink },
    timeout,
  };

  // post
  try {
    const res = await post(url, config);
    if (!res || res.status !== 200 || !res.data || !res.data.length || res.data[0].long !== longLink) {
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
      console.log(`${timeStr} success: https://gotiny.cc/${res.data[0].code}`);
      console.log();
    }
    return `https://gotiny.cc/${res.data[0].code}`;
  } catch (error) {
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} failed: ${error.message}`);
      console.log();
    }
  }
};
