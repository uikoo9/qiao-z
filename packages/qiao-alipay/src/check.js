// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-alipay');

/**
 * check
 * @param {*} app
 * @returns
 */
export const check = async (app) => {
  const methodName = 'check';

  // go
  try {
    const result = await app.alipay.curl('POST', '/v3/alipay/user/deloauth/detail/query', {
      body: {
        date: '20230102',
        offset: 20,
        limit: 1,
      },
    });
    return result && result.responseHttpStatus === 200;
  } catch (error) {
    logger.error(methodName, 'error', error);
  }
};
