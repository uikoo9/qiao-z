// util
import { weixinGet } from './util.js';

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

  // get
  const url = 'https://api.weixin.qq.com/cgi-bin/token';
  const res = await weixinGet(url, {
    grant_type: 'client_credential',
    appid: appId,
    secret: appSecret,
  });

  // r
  return res;
};

/**
 * code2Session
 * @param {*} appId
 * @param {*} appSecret
 * @param {*} jsCode
 * @returns
 */
export const code2Session = async (appId, appSecret, jsCode) => {
  const methodName = 'code2Session';

  // check
  if (!appId) {
    logger.info(methodName, 'need appId');
    return;
  }
  if (!appSecret) {
    logger.info(methodName, 'need appSecret');
    return;
  }
  if (!jsCode) {
    logger.info(methodName, 'need jsCode');
    return;
  }

  // get
  const url = 'https://api.weixin.qq.com/sns/jscode2session';
  const res = await weixinGet(url, {
    grant_type: 'authorization_code',
    appid: appId,
    secret: appSecret,
    js_code: jsCode,
  });

  // r
  return res;
};
