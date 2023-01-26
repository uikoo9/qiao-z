// txsms
import txsms from 'qcloudsms_js';

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
export const sendSMSMsg = (options, callback) => {
  // check
  if (!options) {
    console.log('sendSMSMsg need options');
    return;
  }
  if (!options.appid) {
    console.log('sendSMSMsg need options.appid');
    return;
  }
  if (!options.appkey) {
    console.log('sendSMSMsg need options.appkey');
    return;
  }
  if (!options.mobile) {
    console.log('sendSMSMsg need options.mobile');
    return;
  }
  if (!options.msg) {
    console.log('sendSMSMsg need options.msg');
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
