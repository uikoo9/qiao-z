// check
const { checkUserAuth } = require('../../../check/check-user.js');

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

  // check user
  const user = await checkUserAuth(req, res, userid, usertoken);
  if (!user) return;

  // return
  res.jsonSuccess('合法token！', { user: user });
};
