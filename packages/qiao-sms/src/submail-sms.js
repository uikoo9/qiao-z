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
      const msg = `ajax fail: ${res}`;
      logger.error(methodName, msg);
      resMsg.msg = msg;
      return resMsg;
    }

    // return
    return res.data;
  } catch (error) {
    logger.error(methodName, error);
    resMsg.msg = error;
    return resMsg;
  }
};
