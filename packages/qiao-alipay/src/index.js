// util
import { getAliPay } from './get-alipay.js';
import { check } from './check.js';
import { pay } from './pay.js';
import { query } from './query.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-alipay');

/**
 * init
 * @param {*} config
 * @returns
 */
const init = (config) => {
  const methodName = 'init';

  // check
  if (!config) {
    logger.error(methodName, 'need config');
    return;
  }

  // app
  const app = {};
  app.alipay = getAliPay(config);
  app.check = async () => {
    return await check(app);
  };
  app.pay = async (tradeTitle, tradeOrder, tradeAmount, payMode, returnUrl) => {
    return await pay(app, tradeTitle, tradeOrder, tradeAmount, payMode, returnUrl);
  };
  app.query = async (tradeOrder, needEncrypt) => {
    return await query(app, tradeOrder, needEncrypt);
  };

  // return
  return app;
};

export default init;
