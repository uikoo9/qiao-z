// check
const { checkNormalPath } = require('./check-path.js');
const { checkUserAuth } = require('./check-user.js');
const { checkUserMenu } = require('./check-menu.js');

/**
 * check auth
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports = async function (req, res) {
  // normal visit
  const normalVisit = checkNormalPath(req);
  if (normalVisit) return true;

  // auth - has token
  const userid = req.headers.userid || req.cookies.insistime_userid;
  const usertoken = req.headers.usertoken || req.cookies.insistime_usertoken;
  if (!userid || !usertoken) {
    res.jsonFail('缺少token！');
    return;
  }

  // auth
  try {
    // check user
    const user = await checkUserAuth(req, res, userid, usertoken);
    if (!user) return;

    // user menus
    if (req.url.pathname === '/user/menus') {
      setUserinfo(req, user);
      return true;
    }

    // check menu
    const checkMenuRes = await checkUserMenu(req, res, userid);
    if (!checkMenuRes) return;

    // set userinfo
    setUserinfo(req, user);

    // return
    return true;
  } catch (e) {
    res.jsonFail('校验auth失败！', { errName: e.name, errMsg: e.message });
    return;
  }
};

// set userinfo
function setUserinfo(req, user) {
  req.body['express_userid'] = user['id'];
  req.body['express_username'] = user['ucenter_user_name'];
}
