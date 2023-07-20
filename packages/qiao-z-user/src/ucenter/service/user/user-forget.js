// encode
const encode = require('qiao-encode');

// sql
const sql = require('../../sql/user-sql.json');

/**
 * ucenter user forget
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.username) {
    res.jsonFail('缺少参数username！');
    return;
  }
  if (!req.body.password) {
    res.jsonFail('缺少参数password！');
    return;
  }
  if (!req.body.usercode) {
    res.jsonFail('缺少参数usercode！');
    return;
  }

  // db
  try {
    // consts for code
    const type = 'forget';
    const username = req.body.username;
    const usercode = req.body.usercode;

    // check code
    const codes = await req.db.query(sql.codeGet, [type, username]);
    if (codes.length != 1) {
      res.jsonFail('请先获取手机验证码！');
      return;
    }
    if (usercode != codes[0].ucenter_code_code) {
      res.jsonFail('手机验证码错误！');
      return;
    }

    // check user
    const password = req.body.password;
    const encryptPassword = encode.AESEncrypt(password, global.QIAO_USER_CONFIG.encryptKey);
    const rows = await req.db.query(sql.userGetByMobile, [username]);
    if (rows && rows.length != 1) {
      res.jsonFail('手机号未注册！');
      return;
    }

    // forget
    await req.db.query(sql.userForget, [encryptPassword, rows[0].id]);

    // del code params
    await req.db.query(sql.codeDel, [type, username]);

    // send
    res.jsonSuccess('修改成功！');
  } catch (e) {
    res.jsonFail('修改失败', { errName: e.name, errMsg: e.message });
  }
};
