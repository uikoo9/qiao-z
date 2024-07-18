// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-alipay');

/**
 * checkSign
 * @param {*} app
 * @returns
 */
export const checkSign = async (app, queryObj) => {
  const methodName = 'checkSign';

  // go
  try {
    logger.info(methodName, 'queryObj', queryObj);
    return app.alipay.checkNotifySign(queryObj);
  } catch (error) {
    logger.error(methodName, 'error', error);
  }
};
