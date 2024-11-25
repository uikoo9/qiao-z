// ajax
import { post } from 'qiao-ajax';

// json
import json from 'qiao-json';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z-service');

/**
 * sendSms
 * @param {*} req
 * @param {*} res
 * @param {*} mobile
 * @returns
 */
export const sendSms = async (options) => {
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
    const smsRes = await post(url, {
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
