'use strict';

var qiaoAjax = require('qiao-ajax');
var json = require('qiao-json');
var qiao_log_js = require('qiao.log.js');

// ajax
const logger = qiao_log_js.Logger('qiao-z-service');

/**
 * sendSms
 * @param {*} req
 * @param {*} res
 * @param {*} mobile
 * @returns
 */
const sendSms = async (options) => {
  const methodName = 'sendSms';

  // const
  const url = options.url;
  const appId = options.appId;
  const appKey = options.appKey;
  const mobile = options.mobile;
  const content = options.content;
  logger.info(methodName, 'options', options);

  // send
  try {
    const smsRes = await qiaoAjax.post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        mobile: mobile,
        content: content,
      },
    });

    // check
    if (smsRes.status !== 200) {
      logger.fail(methodName, 'smsRes', smsRes);
      return json.fail(`smsRes.status is ${smsRes.status}`);
    }
    if (smsRes.data.type !== 'success') {
      logger.fail(methodName, 'smsRes', smsRes);
      return json.fail(smsRes.data.msg);
    }

    // r
    return json.success(smsRes.data.msg);
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('send sms network error');
  }
};

exports.sendSms = sendSms;