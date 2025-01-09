// qiao
import { get } from 'qiao-ajax';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-weixin');

/**
 * accessToken
 * @param {*} appId
 * @param {*} appSecret
 */
export const accessToken = async (appId, appSecret) => {
  const methodName = 'accessToken';

  // check
  if (!appId) {
    logger.info(methodName, 'need appId');
    return;
  }
  if (!appSecret) {
    logger.info(methodName, 'need appSecret');
    return;
  }

  try {
    const url = 'https://api.weixin.qq.com/cgi-bin/token';
    const res = await get(url, {
      params: {
        grant_type: 'client_credential',
        appid: appId,
        secret: appSecret,
      },
    });

    // check
    if (res.status !== 200) {
      logger.info(methodName, 'status is not 200', res);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger.error(methodName, 'request error', error);
  }
};
