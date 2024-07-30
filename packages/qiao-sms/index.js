'use strict';

var txsms = require('qcloudsms_js');
var qiao_log_js = require('qiao.log.js');
var qiaoAjax = require('qiao-ajax');

// txsms
const logger$1 = qiao_log_js.Logger('qiao-sms');

/**
 * send sms msg
 * 	options.appid appid
 * 	options.appkey appkey
 * 	options.mtype 0：普通短信，1：营销短信
 * 	options.cnum 86：中国
 * 	options.sign 签名
 * 	options.mobile 手机号
 * 	options.msg	消息
 * 	callback 回调函数
 * @param {*} options
 * @param {*} callback
 * @returns
 */
const sendSMSMsg = (options, callback) => {
  const methodName = 'sendSMSMsg';

  // check
  if (!options) {
    logger$1.info(methodName, 'sendSMSMsg need options');
    return;
  }
  if (!options.appid) {
    logger$1.info(methodName, 'sendSMSMsg need options.appid');
    return;
  }
  if (!options.appkey) {
    logger$1.info(methodName, 'sendSMSMsg need options.appkey');
    return;
  }
  if (!options.mobile) {
    logger$1.info(methodName, 'sendSMSMsg need options.mobile');
    return;
  }
  if (!options.msg) {
    logger$1.info(methodName, 'sendSMSMsg need options.msg');
    return;
  }

  // vars
  const mtype = options.mtype || 0;
  const cnum = options.cnum || 86;
  const sign = options.sign || '坚时科技';

  // sms sender
  const sms = txsms(options.appid, options.appkey);
  const sender = sms.SmsSingleSender();
  sender.send(mtype, cnum, options.mobile, `【${sign}】${options.msg}`, '', 'txsms', (err, req, res) => {
    handleCallback(err, req, res, callback);
  });
};

// handle callback
function handleCallback(err, req, res, callback) {
  // check
  if (!callback) return;

  // success
  let success = false;

  // msg
  let msg;
  if (res.ext !== 'txsms') {
    msg = '0000-mismatched ext!';
  } else if (res.result !== 0) {
    msg = res.result + '-' + res.errmsg;
  } else {
    success = true;
    msg = 'send sms msg success!';
  }

  // callback
  callback(err, req, res, success, msg);
}

// send

/**
 * send sms msg sync
 * 	options.appid	appid
 * 	options.appkey	appkey
 * 	options.mtype	0：普通短信，1：营销短信
 * 	options.cnum	86：中国
 * 	options.sign	签名
 * 	options.mobile	手机号
 * 	options.msg		消息
 * @param {*} options
 * @returns
 */
const sendSMSMsgSync = (options) => {
  return new Promise((resolve, reject) => {
    sendSMSMsg(options, (err, req, res, success, msg) => {
      // err
      if (err) {
        reject(err);
        return;
      }

      // resolve
      resolve({
        success,
        msg,
      });
    });
  });
};

// qiao
const logger = qiao_log_js.Logger('qiao-sms');

/**
 * submailSMS
 * @param {*} options
 * @returns
 */
const submailSMS = async (options) => {
  const methodName = 'sms';

  // const
  const resMsg = {
    status: 'error',
  };

  // check
  if (!options) {
    const msg = 'need options';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }
  if (!options.appid) {
    const msg = 'need options.appid';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }
  if (!options.appkey) {
    const msg = 'need options.appkey';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }
  if (!options.mobile) {
    const msg = 'need options.mobile';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }
  if (!options.content) {
    const msg = 'need options.content';
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }

  // go
  const url = 'https://api-v4.mysubmail.com/sms/send';
  const res = await qiaoAjax.post(url, {
    data: {
      appid: options.appid,
      signature: options.appkey,
      to: options.mobile,
      content: options.content,
    },
  });
  if (!res || res.status !== 200) {
    const msg = `ajax fail: ${res}`;
    logger.error(methodName, msg);
    resMsg.msg = msg;
    return resMsg;
  }

  // return
  return res.data;
};

exports.sendSMSMsg = sendSMSMsg;
exports.sendSMSMsgSync = sendSMSMsgSync;
exports.submailSMS = submailSMS;
