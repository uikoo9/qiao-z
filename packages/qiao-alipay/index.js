'use strict';

var alipaySdk = require('alipay-sdk');
var qiao_log_js = require('qiao.log.js');

// ali pay
const logger$4 = qiao_log_js.Logger('qiao-alipay');

/**
 * getAliPay
 * @param {*} config
 * @returns
 */
const getAliPay = (config) => {
  const methodName = 'getAliPay';

  // check
  if (!config.appId) {
    logger$4.error(methodName, 'need config.appId');
    return;
  }
  if (!config.privateKey) {
    logger$4.error(methodName, 'need config.privateKey');
    return;
  }
  if (!config.alipayPublicKey) {
    logger$4.error(methodName, 'need config.alipayPublicKey');
    return;
  }

  // options
  const options = {
    appId: config.appId,
    privateKey: config.privateKey,
    alipayPublicKey: config.alipayPublicKey,
  };
  if (config.encryptKey) options.encryptKey = config.encryptKey;

  // r
  return new alipaySdk.AlipaySdk(options);
};

// Logger
const logger$3 = qiao_log_js.Logger('qiao-alipay');

/**
 * check
 * @param {*} app
 * @returns
 */
const check = async (app) => {
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
    logger$3.error(methodName, 'error', error);
  }
};

// Logger
const logger$2 = qiao_log_js.Logger('qiao-alipay');

/**
 * pay
 * @param {*} app
 * @param {*} options
 * @returns
 */
const pay = async (app, options) => {
  const methodName = 'pay';

  // check
  if (!options) {
    logger$2.error(methodName, 'need options');
    return;
  }
  if (!options.tradeTitle) {
    logger$2.error(methodName, 'need options.tradeTitle');
    return;
  }
  if (!options.tradeOrder) {
    logger$2.error(methodName, 'need options.tradeOrder');
    return;
  }
  if (!options.tradeAmount) {
    logger$2.error(methodName, 'need options.tradeAmount');
    return;
  }
  if (!options.payMode) {
    logger$2.error(methodName, 'need options.payMode');
    return;
  }
  if (!options.returnUrl) {
    logger$2.error(methodName, 'need options.returnUrl');
    return;
  }

  // content
  const bizContent = {
    product_code: 'FAST_INSTANT_TRADE_PAY',
    subject: options.tradeTitle,
    out_trade_no: options.tradeOrder,
    total_amount: options.tradeAmount,
    qr_pay_mode: options.payMode,
  };
  if (options.notifyUrl) bizContent.notify_url = options.notifyUrl;
  logger$2.info(methodName, 'bizContent', bizContent);

  // html
  try {
    return app.alipay.pageExecute('alipay.trade.page.pay', 'POST', {
      bizContent,
      returnUrl: options.returnUrl,
    });
  } catch (error) {
    logger$2.error(methodName, 'error', error);
  }
};

// Logger
const logger$1 = qiao_log_js.Logger('qiao-alipay');

/**
 * query
 * @param {*} app
 * @param {*} tradeOrder
 * @param {*} needEncrypt
 * @returns
 */
const query = async (app, tradeOrder, needEncrypt) => {
  const methodName = 'query';

  // check
  if (!tradeOrder) {
    logger$1.error(methodName, 'need tradeOrder');
    return;
  }

  // options
  const queryOptions = {
    needEncrypt: needEncrypt || false,
    body: {
      out_trade_no: tradeOrder,
    },
  };
  logger$1.info(methodName, 'queryOptions', queryOptions);

  // query
  // html
  try {
    return await app.alipay.curl('POST', '/v3/alipay/trade/query', queryOptions);
  } catch (error) {
    logger$1.error(methodName, 'error', error);
  }
};

// util
const logger = qiao_log_js.Logger('qiao-alipay');

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
  app.pay = async (options) => {
    return await pay(app, options);
  };
  app.query = async (tradeOrder, needEncrypt) => {
    return await query(app, tradeOrder, needEncrypt);
  };

  // return
  return app;
};

module.exports = init;
