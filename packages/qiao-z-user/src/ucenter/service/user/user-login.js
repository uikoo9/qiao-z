// encode
const encode = require('qiao-encode');

// sql
const sql = require('../../sql/user-sql.json');

/**
 * ucenter user login
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

  // consts
  const username = req.body.username;
  const password = req.body.password;
  const encryptPassword = encode.AESEncrypt(password, global.QZ_CONFIG.encryptKey);

  // db
  try {
    // check user
    const rows = await req.db.query(sql.userLogin, [username, encryptPassword]);
    if (!rows || rows.length != 1) {
      res.jsonFail('用户名或密码错误！');
      return;
    }

    // send
    const usertoken = encode.AESEncrypt(username + encryptPassword, global.QZ_CONFIG.encryptKey);
    res.jsonSuccess('登录成功！', {
      userid: rows[0].id,
      usertoken: usertoken,
    });
  } catch (e) {
    res.jsonFail('登录失败', { errName: e.name, errMsg: e.message });
  }
};
