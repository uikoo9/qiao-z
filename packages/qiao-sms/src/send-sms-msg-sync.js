// send
import { sendSMSMsg } from './send-sms-msg.js';

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
export const sendSMSMsgSync = (options) => {
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
