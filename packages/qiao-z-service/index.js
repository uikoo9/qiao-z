'use strict';

var qiaoAjax = require('qiao-ajax');
var json = require('qiao-json');
var qiao_log_js = require('qiao.log.js');

// ajax
const logger = qiao_log_js.Logger('qiao-z-service');

/**
 * fetch
 * @param {*} url
 * @param {*} data
 * @returns
 */
const fetch = async (url, data) => {
  const methodName = 'fetch';

  // send
  try {
    const res = await qiaoAjax.post(url, {
      data: data,
    });

    // check
    if (res.status !== 200) {
      logger.error(methodName, 'res', res);
      return json.fail(`res.status is ${res.status}`);
    }
    if (res.data.type !== 'success') {
      logger.error(methodName, 'res', res);
      return json.fail(res.data.msg);
    }

    // r
    return json.success(res.data.msg, res.data.obj);
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('fetch network error');
  }
};

// util

/**
 * cosToken
 * @param {*} options
 * @returns
 */
const cosToken = async (options) => {
  return await fetch(options.url + 'cos/token', options);
};

/**
 * cosSign
 * @param {*} options
 * @returns
 */
const cosSign = async (options) => {
  return await fetch(options.url + 'cos/sign', options);
};

// util

/**
 * sendMsgToFeishu
 * @param {*} options
 * @returns
 */
const sendMsgToFeishu = async (options) => {
  // content
  const content = JSON.stringify({
    post: {
      zh_cn: {
        content: [
          [
            {
              tag: 'text',
              text: options.feishuMsg,
            },
          ],
        ],
      },
    },
  });

  return await fetch(options.url, {
    appId: options.appId,
    appKey: options.appKey,
    url: options.feishuUrl,
    content: content,
  });
};

// util

/**
 * addRecommend
 * @param {*} options
 * @returns
 */
const addRecommend = async (options) => {
  return await fetch(options.url + 'recommend/add', options);
};

/**
 * listRecommend
 * @param {*} options
 * @returns
 */
const listRecommend = async (options) => {
  return await fetch(options.url + 'recommend/list', options);
};

/**
 * changeRecommend
 * @param {*} options
 * @returns
 */
const changeRecommend = async (options) => {
  return await fetch(options.url + 'recommend/change', options);
};

// util

/**
 * sendSms
 * @param {*} options
 * @returns
 */
const sendSms = async (options) => {
  return await fetch(options.url, options);
};

exports.addRecommend = addRecommend;
exports.changeRecommend = changeRecommend;
exports.cosSign = cosSign;
exports.cosToken = cosToken;
exports.listRecommend = listRecommend;
exports.sendMsgToFeishu = sendMsgToFeishu;
exports.sendSms = sendSms;
