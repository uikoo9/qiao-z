// qiao-ajax
import { post } from 'qiao-ajax';

/**
 * gotiny.cc
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
export const goTinyCC = async (longLink, timeout) => {
  // check
  if (!longLink) return;

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
    if (!res || res.status !== 200 || !res.data || !res.data.length || res.data[0].long !== longLink) return;

    return `https://gotiny.cc/${res.data[0].code}`;
  } catch (error) {
    console.log(error);
  }
};
