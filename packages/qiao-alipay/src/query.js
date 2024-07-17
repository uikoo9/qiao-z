// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-alipay');

/**
 * query
 * @param {*} app
 * @param {*} tradeOrder
 * @param {*} needEncrypt
 * @returns
 */
export const query = async (app, tradeOrder, needEncrypt) => {
  const methodName = 'query';

  // check
  if (!tradeOrder) {
    logger.error(methodName, 'need tradeOrder');
    return;
  }

  // options
  const queryOptions = {
    needEncrypt: needEncrypt || false,
    body: {
      out_trade_no: tradeOrder,
    },
  };
  logger.info(methodName, 'queryOptions', queryOptions);

  // query
  // html
  try {
    return await app.alipay.curl('POST', '/v3/alipay/trade/query', queryOptions);
  } catch (error) {
    logger.error(methodName, 'error', error);
  }
};
