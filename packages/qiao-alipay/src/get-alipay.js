// ali pay
import { AlipaySdk } from 'alipay-sdk';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-alipay');

/**
 * getAliPay
 * @param {*} config
 * @returns
 */
export const getAliPay = (config) => {
  const methodName = 'getAliPay';

  // check
  if (!config.appId) {
    logger.error(methodName, 'need config.appId');
    return;
  }
  if (!config.privateKey) {
    logger.error(methodName, 'need config.privateKey');
    return;
  }
  if (!config.alipayPublicKey) {
    logger.error(methodName, 'need config.alipayPublicKey');
    return;
  }

  // sdk
  const alipaySdk = new AlipaySdk({
    appId: config.appId,
    privateKey: config.privateKey,
    alipayPublicKey: config.alipayPublicKey,
  });
  return alipaySdk;
};
