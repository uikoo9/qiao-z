'use strict';

var alipaySdk = require('alipay-sdk');
var qiao_log_js = require('qiao.log.js');

// ali pay
const logger$2 = qiao_log_js.Logger('qiao-alipay');

/**
 * getAliPay
 * @param {*} config
 * @returns
 */
const getAliPay = (config) => {
  const methodName = 'getAliPay';

  // check
  if (!config.appId) {
    logger$2.error(methodName, 'need config.appId');
    return;
  }
  if (!config.privateKey) {
    logger$2.error(methodName, 'need config.privateKey');
    return;
  }
  if (!config.alipayPublicKey) {
    logger$2.error(methodName, 'need config.alipayPublicKey');
    return;
  }

  // sdk
  const alipaySdk$1 = new alipaySdk.AlipaySdk({
    appId: config.appId,
    privateKey: config.privateKey,
    alipayPublicKey: config.alipayPublicKey,
  });
  return alipaySdk$1;
};

/**
 * check
 * @param {*} app
 * @returns
 */
const check = async (app) => {
  // q
  const result = await app.alipay.curl('POST', '/v3/alipay/user/deloauth/detail/query', {
    body: {
      date: '20230102',
      offset: 20,
      limit: 1,
    },
  });

  // r
  return result && result.responseHttpStatus === 200;
};

// Logger
const logger$1 = qiao_log_js.Logger('qiao-alipay');

/**
 * pay
 * @param {*} app
 * @param {*} tradeTitle
 * @param {*} tradeOrder
 * @param {*} tradeAmount
 * @param {*} returnUrl
 * @returns
 */
const pay = async (app, tradeTitle, tradeOrder, tradeAmount, payMode, returnUrl) => {
  const methodName = 'pay';

  // check
  if (!tradeTitle) {
    logger$1.error(methodName, 'need tradeTitle');
    return;
  }
  if (!tradeOrder) {
    logger$1.error(methodName, 'need tradeOrder');
    return;
  }
  if (!tradeAmount) {
    logger$1.error(methodName, 'need tradeAmount');
    return;
  }
  if (!payMode) {
    logger$1.error(methodName, 'need payMode');
    return;
  }
  if (!returnUrl) {
    logger$1.error(methodName, 'need returnUrl');
    return;
  }

  // content
  const bizContent = {
    product_code: 'FAST_INSTANT_TRADE_PAY',
    subject: tradeTitle,
    out_trade_no: tradeOrder,
    total_amount: tradeAmount,
    qr_pay_mode: payMode,
  };

  // html
  const html = app.alipay.pageExecute('alipay.trade.page.pay', 'POST', {
    bizContent,
    returnUrl: returnUrl,
  });

  console.log(html);
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
  app.config = config;
  app.alipay = getAliPay(config);
  app.check = async () => {
    return await check(app);
  };
  app.pay = async (tradeTitle, tradeOrder, tradeAmount, payMode, returnUrl) => {
    return await pay(app, tradeTitle, tradeOrder, tradeAmount, payMode, returnUrl);
  };

  // return
  return app;
};

module.exports = init;
