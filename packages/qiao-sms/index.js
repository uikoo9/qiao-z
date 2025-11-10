'use strict';

var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');

// qiao
const logger = qiao_log_js.Logger('qiao-sms');

/**
 * submailSMS
 * @param {*} options
 * @returns
 */
const submailSMS = async (options) => {
  return await sendSubmailSMS('https://api-v4.mysubmail.com/sms/send', options);
};

/**
 * submailInternationalSMS
 * @param {*} options
 * @returns
 */
const submailInternationalSMS = async (options) => {
  return await sendSubmailSMS('https://api-v4.mysubmail.com/internationalsms/send', options);
};

// send submail sms
async function sendSubmailSMS(url, options) {
  const methodName = 'sendSubmailSMS';

  // const
  const resMsg = {
    status: 'error',
  };

  // check
  if (!options) {
    const msg = 'need options';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }
  if (!options.appid) {
    const msg = 'need options.appid';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }
  if (!options.appkey) {
    const msg = 'need options.appkey';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }
  if (!options.mobile) {
    const msg = 'need options.mobile';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }
  if (!options.content) {
    const msg = 'need options.content';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }

  // go
  try {
    const res = await qiaoAjax.post(url, {
      data: {
        appid: options.appid,
        signature: options.appkey,
        to: options.mobile,
        content: options.content,
      },
    });
    if (!res || res.status !== 200) {
      const msg = `ajax fail: ${res}`;
      logger.error(methodName, msg);
      resMsg.msg = msg;
      return resMsg;
    }

    // return
    return res.data;
  } catch (error) {
    logger.error(methodName, error);
    resMsg.msg = `request submail sms error, url is ${url}, options is ${JSON.stringify(options)}`;
    return resMsg;
  }
}

exports.submailInternationalSMS = submailInternationalSMS;
exports.submailSMS = submailSMS;
