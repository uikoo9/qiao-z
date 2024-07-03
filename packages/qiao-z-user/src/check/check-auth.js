// encode
const { AESEncrypt } = require('qiao-encode');

// sql
const sql = require('../ucenter/sql/user-sql.json');

// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-user');

/**
 * checkUserAuth
 * @param {*} req
 * @param {*} userid
 * @param {*} usertoken
 * @returns
 */
exports.checkUserAuth = async function (req, userid, usertoken) {
  const methodName = 'checkUserAuth';

  // auth - check user
  try {
    // get user
    const rows = await req.db.query(sql.userGetById, [userid]);
    if (!rows || rows.length != 1) {
      logger.error(methodName, 'user not exist');
      return;
    }

    // check token
    const user = rows[0];
    const username = user['ucenter_user_name'];
    const password = user['ucenter_user_password'];
    const rUsertoken = AESEncrypt(username + password, global.QZ_CONFIG.encryptKey);

    // send
    const finalUsertoken = decodeURIComponent(usertoken);
    if (finalUsertoken !== rUsertoken) {
      logger.error(methodName, 'user token error');
      return;
    }

    // return
    return true;
  } catch (e) {
    logger.error(methodName, 'check user auth error', e);
  }
};
