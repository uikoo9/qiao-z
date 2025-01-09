'use strict';

var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');

// qiao
const logger$1 = qiao_log_js.Logger('qiao-weixin');

/**
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
const weixinGet = async (url, params) => {
  const methodName = 'get';

  try {
    const res = await qiaoAjax.get(url, {
      params: params,
    });

    // check
    if (res.status !== 200) {
      logger$1.error(methodName, 'status is not 200', res);
      return;
    }
    if (res.data.errcode) {
      logger$1.error(methodName, 'request api error', res.data);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger$1.error(methodName, 'request error', error);
  }
};

// util
const logger = qiao_log_js.Logger('qiao-weixin');

/**
 * accessToken
 * @param {*} appId
 * @param {*} appSecret
 */
const accessToken = async (appId, appSecret) => {
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
const code2Session = async (appId, appSecret, jsCode) => {
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

exports.accessToken = accessToken;
exports.code2Session = code2Session;
