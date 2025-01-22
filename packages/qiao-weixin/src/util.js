// qiao
import { get, post } from 'qiao-ajax';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-weixin');

/**
 * weixinGet
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const weixinGet = async (url, params) => {
  const methodName = 'weixinGet';

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

/**
 * weixinPayPost
 * @param {*} url
 * @param {*} headers
 * @param {*} body
 * @returns
 */
export const weixinPayPost = async (url, headers, body) => {
  const methodName = 'weixinPayPost';

  try {
    const res = await post(url, {
      headers: headers,
      data: body,
    });

    // check
    if (res.status !== 200) {
      logger.error(methodName, 'status is not 200', res);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger.error(methodName, 'request error', error);
  }
};
