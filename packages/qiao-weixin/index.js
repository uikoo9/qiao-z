'use strict';

var fs = require('fs');
var crypto = require('crypto');
var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');
var qiaoEncode = require('qiao-encode');

// fs
const logger$2 = qiao_log_js.Logger('qiao-weixin');

/**
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
const weixinGet = async (url, params) => {
  const methodName = 'weixinGet';

  try {
    const res = await qiaoAjax.get(url, {
      params: params,
    });

    // check
    if (res.status !== 200) {
      logger$2.error(methodName, 'status is not 200', res);
      return;
    }
    if (res.data.errcode) {
      logger$2.error(methodName, 'request api error', res.data);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger$2.error(methodName, 'request error', error);
  }
};

/**
 * weixinPayPost
 * @param {*} url
 * @param {*} headers
 * @param {*} body
 * @returns
 */
const weixinPayPost = async (url, headers, body) => {
  const methodName = 'weixinPayPost';

  try {
    const res = await qiaoAjax.post(url, {
      headers: headers,
      data: body,
    });

    // check
    if (res.status !== 200) {
      logger$2.error(methodName, 'status is not 200', res);
      return;
    }

    // r
    return res.data;
  } catch (error) {
    logger$2.error(methodName, 'request error', error);
  }
};

/**
 * signWithBody
 * @param {*} method
 * @param {*} path
 * @param {*} timestamp
 * @param {*} nonceStr
 * @param {*} privateKeyPath
 * @param {*} body
 * @returns
 */
const signWithBody = (method, path, timestamp, nonceStr, privateKeyPath, body) => {
  // sign str
  const requestBody = JSON.stringify(body);
  const signStr = `${method}\n${path}\n${timestamp}\n${nonceStr}\n${requestBody}\n`;

  // sign
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const signer = crypto.createSign('sha256');
  signer.update(signStr);

  // r
  return signer.sign(privateKey, 'base64');
};

/**
 * signForPay
 * @param {*} privateKeyPath
 * @param {*} signStr
 * @returns
 */
const signForPay = (privateKeyPath, signStr) => {
  // sign
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const signer = crypto.createSign('sha256');
  signer.update(signStr);

  // r
  return signer.sign(privateKey, 'base64');
};

// util
const logger$1 = qiao_log_js.Logger('qiao-weixin');

/**
 * accessToken
 * @param {*} appId
 * @param {*} appSecret
 */
const accessToken = async (appId, appSecret) => {
  const methodName = 'accessToken';

  // check
  if (!appId) {
    logger$1.info(methodName, 'need appId');
    return;
  }
  if (!appSecret) {
    logger$1.info(methodName, 'need appSecret');
    return;
  }

  // get
  const url = 'https://api.weixin.qq.com/cgi-bin/token';
  const res = await weixinGet(url, {
    grant_type: 'client_credential',
    appid: appId,
    secret: appSecret,
  });

  // r
  return res;
};

/**
 * code2Session
 * @param {*} appId
 * @param {*} appSecret
 * @param {*} jsCode
 * @returns
 */
const code2Session = async (appId, appSecret, jsCode) => {
  const methodName = 'code2Session';

  // check
  if (!appId) {
    logger$1.info(methodName, 'need appId');
    return;
  }
  if (!appSecret) {
    logger$1.info(methodName, 'need appSecret');
    return;
  }
  if (!jsCode) {
    logger$1.info(methodName, 'need jsCode');
    return;
  }

  // get
  const url = 'https://api.weixin.qq.com/sns/jscode2session';
  const res = await weixinGet(url, {
    grant_type: 'authorization_code',
    appid: appId,
    secret: appSecret,
    js_code: jsCode,
  });

  // r
  return res;
};

// qiao
const logger = qiao_log_js.Logger('qiao-weixin');

/**
 * prepay
 * @param {*} options
 * @returns
 */
const prepay = async (options) => {
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
  const nonceStr = qiaoEncode.uuid().replace(/-/g, '').substring(0, 32);
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

/**
 * pay
 * @param {*} options
 * @returns
 */
const pay = (options) => {
  const methodName = 'prepay';

  // check
  if (!options) {
    logger.error(methodName, 'need options');
    return;
  }
  if (!options.appid) {
    logger.error(methodName, 'need options.appid');
    return;
  }
  if (!options.prepay_id) {
    logger.error(methodName, 'need options.prepay_id');
    return;
  }
  if (!options.keyPath) {
    logger.error(methodName, 'need options.keyPath');
    return;
  }

  // sign
  const timestamp = `${Math.floor(Date.now() / 1000)}`;
  const nonceStr = qiaoEncode.uuid().replace(/-/g, '').substring(0, 32);
  const prepayStr = `prepay_id=${options.prepay_id}`;
  const pay = `${options.appid}\n${timestamp}\n${nonceStr}\n${prepayStr}\n`;
  const sign = signForPay(options.keyPath, pay);

  // r
  return {
    timeStamp: timestamp,
    nonceStr: nonceStr,
    package: prepayStr,
    signType: 'RSA',
    paySign: sign,
  };
};

exports.accessToken = accessToken;
exports.code2Session = code2Session;
exports.pay = pay;
exports.prepay = prepay;
