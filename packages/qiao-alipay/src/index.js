// util
import { getAliPay } from './util.js';

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
  app.config = config;
  app.alipay = getAliPay(config);

  // return
  return app;
};

export default init;
