// qiao
import { uuid } from 'qiao-encode';

// util
import { signWithBody, weixinPayPost } from './util.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-weixin');

/**
 * prepay
 * @param {*} options
 * @returns
 */
export const prepay = async (options) => {
  const methodName = 'prepay';

  // check
  if (!options) {
    logger.error(methodName, 'need options');
    return;
  }
  if (!options.keyPath) {
    logger.error(methodName, 'need options.keyPath');
    return;
  }
  if (!options.appid) {
    logger.error(methodName, 'need options.appid');
    return;
  }
  if (!options.mchid) {
    logger.error(methodName, 'need options.mchid');
    return;
  }
  if (!options.description) {
    logger.error(methodName, 'need options.description');
    return;
  }
  if (!options.out_trade_no) {
    logger.error(methodName, 'need options.out_trade_no');
    return;
  }
  if (!options.notify_url) {
    logger.error(methodName, 'need options.notify_url');
    return;
  }
  if (!options.amount) {
    logger.error(methodName, 'need options.amount');
    return;
  }
  if (!options.openid) {
    logger.error(methodName, 'need options.openid');
    return;
  }
  if (!options.serial_no) {
    logger.error(methodName, 'need options.serial_no');
    return;
  }

  // sign
  const method = 'POST';
  const path = '/v3/pay/transactions/jsapi';
  const timestamp = Math.floor(Date.now() / 1000);
  const nonceStr = uuid().replace(/-/g, '').substring(0, 32);
  const keyPath = options.keyPath;
  const body = {
    appid: options.appid,
    mchid: options.mchid,
    description: options.description,
    out_trade_no: options.out_trade_no,
    notify_url: options.notify_url,
    amount: {
      total: options.amount,
    },
    payer: {
      openid: options.openid,
    },
  };
  const signature = signWithBody(method, path, timestamp, nonceStr, keyPath, body);

  // post
  const host = 'https://api.mch.weixin.qq.com';
  const url = `${host}${path}`;
  const signType = 'WECHATPAY2-SHA256-RSA2048';
  const headers = {
    Authorization: `${signType} mchid="${options.mchid}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${options.serial_no}"`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // r
  return await weixinPayPost(url, headers, body);
};
