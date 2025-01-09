// qiao
import { get } from 'qiao-ajax';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-weixin');

/**
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const weixinGet = async (url, params) => {
  const methodName = 'get';

  try {
    const res = await get(url, {
      params: params,
    });

    // check
    if (res.status !== 200) {
      logger.error(methodName, 'status is not 200', res);
      return;
    }
    if (res.data.errcode) {
      logger.error(methodName, 'request api error', res.data);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger.error(methodName, 'request error', error);
  }
};
