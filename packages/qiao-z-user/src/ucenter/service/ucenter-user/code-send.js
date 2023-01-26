// encode
const encode = require('qiao-encode');

// sms
const sms = require('qiao-sms');

// sql
const sql = require('../../sql/ucenter-user-sql.json');

/**
 * ucenter code send
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.type) {
    res.jsonFail('缺少参数type！');
    return;
  }
  if (!req.body.sign) {
    res.jsonFail('缺少参数sign！');
    return;
  }
  if (!req.body.mobile) {
    res.jsonFail('缺少参数mobile！');
    return;
  }

  // operate
  try {
    // consts for service
    const type = req.body.type;
    const mobile = req.body.mobile;

    // type service
    const users = await req.db.query(sql.ucenterUserGetByMobile, [mobile]);
    if (type == 'reg' && users && users.length) {
      res.jsonFail('手机号已注册！');
      return;
    }
    if (type == 'forget' && users && !users.length) {
      res.jsonFail('手机号未注册！');
      return;
    }

    // db
    const code = encode.randomNumber(6);
    const rows = await req.db.query(sql.ucenterCodeGet, [type, mobile]);
    if (rows.length == 1) {
      await req.db.query(sql.ucenterCodeUpdate, [code, type, mobile]);
    } else {
      await req.db.query(sql.ucenterCodeDel, [type, mobile]);
      await req.db.query(sql.ucenterCodeAdd, [type, mobile, code]);
    }

    // consts for send
    const appid = global.QIAO_USER_CONFIG.sms.appid;
    const appkey = global.QIAO_USER_CONFIG.sms.appkey;
    const sign = req.body.sign;

    // send
    const smsRes = await sms.sendSMSMsgSync({
      appid: appid,
      appkey: appkey,
      sign: sign,
      mobile: mobile,
      msg: `您的验证码是：${code}，如非本人操作，请忽略此短信。`,
      // 验证码：{1}（切勿向任何人透露）。
      // 您的验证码是：{1}，如非本人操作，请忽略此短信。
    });

    // check send
    if (!smsRes.success) {
      res.jsonFail(smsRes.msg);
      return;
    }

    // suc
    res.jsonSuccess('验证码发送成功！');
  } catch (e) {
    res.jsonFail('验证码发送失败！', { errName: e.name, errMsg: e.message });
  }
};
