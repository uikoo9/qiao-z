// ajax
import { get } from 'qiao-ajax';

// ip-regex
import i from 'ip-regex';

/**
 * getIp
 * @returns
 */
export const getIp = async () => {
  // url
  const url = 'https://insistime.com/ip?type=api';
  const res = await get(url);

  // check
  if (!res || res.status !== 200 || !res.data) {
    console.log('get ip failed');
    return;
  }

  // ip
  const ip = res.data;
  const isIp = i.v4({ exact: true }).test(ip);
  if (!isIp) {
    console.log('get ip failed');
    return;
  }

  //
  return ip;
};
