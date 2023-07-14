// encode
const { AESEncrypt } = require('qiao-encode');

// sql
const sql = require('../ucenter/sql/user-sql.json');

/**
 * checkUserAuth
 * @param {*} req
 * @param {*} res
 * @param {*} userid
 * @param {*} usertoken
 * @returns
 */
exports.checkUserAuth = async function (req, res, userid, usertoken) {
  // auth - check user
  try {
    // get user
    const rows = await req.db.query(sql.userGetById, [userid]);
    if (!rows || rows.length != 1) {
      res.jsonFail('缺少用户信息！');
      return;
    }

    // check token
    const user = rows[0];
    const username = user['ucenter_user_name'];
    const password = user['ucenter_user_password'];
    const rUsertoken = AESEncrypt(username + password, global.QIAO_USER_CONFIG.encryptKey);

    // send
    const finalUsertoken = decodeURIComponent(usertoken);
    if (finalUsertoken !== rUsertoken) {
      res.jsonFail('非法token！');
      return;
    }

    // return
    return user;
  } catch (e) {
    res.jsonFail('校验token失败！', { errName: e.name, errMsg: e.message });
    return;
  }
};
