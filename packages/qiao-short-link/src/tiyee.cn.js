// qs
import { stringify } from 'qs';

// qiao-ajax
import { post } from 'qiao-ajax';

/**
 * tiyee.cn
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
export const tiyeeCN = async (longLink, timeout) => {
  // check
  if (!longLink) return;

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
    if (!res || res.status !== 200 || !res.data) return;

    return `https://${res.data.short_url}`;
  } catch (error) {
    console.log(error);
  }
};
