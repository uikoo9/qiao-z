// qiao
import { post } from 'qiao-ajax';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-sms');

/**
 * submailSMS
 * @param {*} options
 * @returns
 */
export const submailSMS = async (options) => {
  const methodName = 'sms';

  // check
  if (!options) {
    logger.error(methodName, 'need options');
    return;
  }
  if (!options.appid) {
    logger.error(methodName, 'need options.appid');
    return;
  }
  if (!options.appkey) {
    logger.error(methodName, 'need options.appkey');
    return;
  }
  if (!options.mobile) {
    logger.error(methodName, 'need options.mobile');
    return;
  }
  if (!options.content) {
    logger.error(methodName, 'need options.content');
    return;
  }

  // go
  const url = 'https://api-v4.mysubmail.com/sms/send';
  const res = await post(url, {
    data: {
      appid: options.appid,
      signature: options.appkey,
      to: options.mobile,
      content: options.content,
    },
  });
  if (!res || res.status !== 200) {
    logger.error(methodName, 'ajax fail', res);
    return;
  }

  // check res
  if (!res.data || res.data.status !== 'success') {
    logger.error(methodName, 'sms fail', res.data);
    return;
  }

  // return
  return res.data;
};
