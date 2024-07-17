'use strict';

var alipaySdk = require('alipay-sdk');
var qiao_log_js = require('qiao.log.js');

// ali pay
const logger$1 = qiao_log_js.Logger('qiao-alipay');

/**
 * getAliPay
 * @param {*} config
 * @returns
 */
const getAliPay = (config) => {
  const methodName = 'getAliPay';

  // check
  if (!config.appId) {
    logger$1.error(methodName, 'need config.appId');
    return;
  }
  if (!config.privateKey) {
    logger$1.error(methodName, 'need config.privateKey');
    return;
  }
  if (!config.alipayPublicKey) {
    logger$1.error(methodName, 'need config.alipayPublicKey');
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

  // return
  return app;
};

module.exports = init;
