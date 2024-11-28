'use strict';

var qiaoAjax = require('qiao-ajax');
var json = require('qiao-json');
var qiao_log_js = require('qiao.log.js');

// ajax
const logger$2 = qiao_log_js.Logger('qiao-z-service');

/**
 * sendMsgToFeishu
 * @param {*} options
 * @returns
 */
const sendMsgToFeishu = async (options) => {
  const methodName = 'sendMsgToFeishu';

  // const
  const url = options.url;
  const appId = options.appId;
  const appKey = options.appKey;
  const feishuUrl = options.feishuUrl;
  const feishuMsg = options.feishuMsg;
  logger$2.info(methodName, 'options', options);

  // content
  const content = JSON.stringify({
    post: {
      zh_cn: {
        content: [
          [
            {
              tag: 'text',
              text: feishuMsg,
            },
          ],
        ],
      },
    },
  });

  // go
  try {
    const feishuRes = await qiaoAjax.post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        url: feishuUrl,
        content: content,
      },
    });

    // check
    if (feishuRes.status !== 200) {
      logger$2.error(methodName, 'feishuRes', feishuRes);
      return json.fail(`feishuRes.status is ${feishuRes.status}`);
    }
    if (feishuRes.data.type !== 'success') {
      logger$2.error(methodName, 'smsRes', feishuRes);
      return json.fail(feishuRes.data.msg);
    }

    // r
    return json.success(feishuRes.data.msg);
  } catch (error) {
    logger$2.error(methodName, error);
    return json.fail('send msg to feishu network error');
  }
};

// ajax
const logger$1 = qiao_log_js.Logger('qiao-z-service');

/**
 * addRecommend
 * @param {*} options
 * @returns
 */
const addRecommend = async (options) => {
  const methodName = 'addRecommend';

  // const
  const url = options.url + 'recommend/add';
  const appId = options.appId;
  const appKey = options.appKey;
  const userId = options.userId;
  const newUserId = options.newUserId;
  logger$1.info(methodName, 'options', options);

  // send
  try {
    const recommendRes = await qiaoAjax.post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        userId: userId,
        newUserId: newUserId,
      },
    });

    // check
    if (recommendRes.status !== 200) {
      logger$1.error(methodName, 'recommendRes', recommendRes);
      return json.fail(`recommendRes.status is ${recommendRes.status}`);
    }
    if (recommendRes.data.type !== 'success') {
      logger$1.error(methodName, 'recommendRes', recommendRes);
      return json.fail(recommendRes.data.msg);
    }

    // r
    return json.success(recommendRes.data.msg);
  } catch (error) {
    logger$1.error(methodName, error);
    return json.fail('add recommend network error');
  }
};

/**
 * listRecommend
 * @param {*} options
 * @returns
 */
const listRecommend = async (options) => {
  const methodName = 'listRecommend';

  // const
  const url = options.url + 'recommend/list';
  const appId = options.appId;
  const appKey = options.appKey;
  const userId = options.userId;
  logger$1.info(methodName, 'options', options);

  // send
  try {
    const recommendRes = await qiaoAjax.post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        userId: userId,
      },
    });

    // check
    if (recommendRes.status !== 200) {
      logger$1.error(methodName, 'recommendRes', recommendRes);
      return json.fail(`recommendRes.status is ${recommendRes.status}`);
    }
    if (recommendRes.data.type !== 'success') {
      logger$1.error(methodName, 'recommendRes', recommendRes);
      return json.fail(recommendRes.data.msg);
    }

    // r
    return json.success(recommendRes.data.msg);
  } catch (error) {
    logger$1.error(methodName, error);
    return json.fail('list recommend network error');
  }
};

/**
 * changeRecommend
 * @param {*} options
 * @returns
 */
const changeRecommend = async (options) => {
  const methodName = 'changeRecommend';

  // const
  const url = options.url + 'recommend/change';
  const appId = options.appId;
  const appKey = options.appKey;
  const userId = options.userId;
  const newUserId = options.newUserId;
  logger$1.info(methodName, 'options', options);

  // send
  try {
    const recommendRes = await qiaoAjax.post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        userId: userId,
        newUserId: newUserId,
      },
    });

    // check
    if (recommendRes.status !== 200) {
      logger$1.error(methodName, 'recommendRes', recommendRes);
      return json.fail(`recommendRes.status is ${recommendRes.status}`);
    }
    if (recommendRes.data.type !== 'success') {
      logger$1.error(methodName, 'recommendRes', recommendRes);
      return json.fail(recommendRes.data.msg);
    }

    // r
    return json.success(recommendRes.data.msg);
  } catch (error) {
    logger$1.error(methodName, error);
    return json.fail('change recommend network error');
  }
};

// ajax
const logger = qiao_log_js.Logger('qiao-z-service');

/**
 * sendSms
 * @param {*} options
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
      logger.error(methodName, 'smsRes', smsRes);
      return json.fail(`smsRes.status is ${smsRes.status}`);
    }
    if (smsRes.data.type !== 'success') {
      logger.error(methodName, 'smsRes', smsRes);
      return json.fail(smsRes.data.msg);
    }

    // r
    return json.success(smsRes.data.msg);
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('send sms network error');
  }
};

exports.addRecommend = addRecommend;
exports.changeRecommend = changeRecommend;
exports.listRecommend = listRecommend;
exports.sendMsgToFeishu = sendMsgToFeishu;
exports.sendSms = sendSms;
