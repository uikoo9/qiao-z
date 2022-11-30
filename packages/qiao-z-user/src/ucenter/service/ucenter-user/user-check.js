// encode
const encode = require('qiao-encode');

// sql
const sql = require('../../sql/ucenter-user-sql.json');

/**
 * ucenter user check
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.userid) {
    res.jsonFail('缺少参数userid！');
    return;
  }
  if (!req.body.usertoken) {
    res.jsonFail('缺少参数usertoken！');
    return;
  }

  // consts
  const userid = req.body.userid;
  const usertoken = req.body.usertoken;

  // db
  try {
    // get user
    const rows = await req.db.query(sql.ucenterUserGetById, [userid]);
    if (!rows || rows.length != 1) {
      res.jsonFail('获取用户失败！');
      return;
    }

    // check token
    const user = rows[0];
    const username = user['ucenter_user_name'];
    const password = user['ucenter_user_password'];
    const rUsertoken = encode.AESEncrypt(username + password, global.QIAO_USER_CONFIG.encryptKey);

    // send
    if (usertoken == rUsertoken) {
      res.jsonSuccess('合法token！', { user: user });
    } else {
      res.jsonFail('非法token！');
    }
  } catch (e) {
    res.jsonFail('校验token失败！', { errName: e.name, errMsg: e.message });
  }
};
