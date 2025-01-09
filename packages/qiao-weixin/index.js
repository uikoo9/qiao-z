'use strict';

var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');

// qiao
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

  try {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const res = await qiaoAjax.get(url);

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

exports.accessToken = accessToken;
