// sql
const sql = require('../ucenter/sql/user-sql.json');

/**
 * checkUserMenu
 * @param {*} req
 * @param {*} res
 * @param {*} userid
 * @returns
 */
exports.checkUserMenu = async function (req, res, userid) {
  // auth - check menus
  try {
    // get menus
    const menus = await req.db.query(sql.userMenus, [userid]);
    if (!menus || menus.length != 1) {
      res.jsonFail('非法的访问！');
      return;
    }

    // check path
    const visitPath = `#${req.url.pathname}`;
    for (let i = 0; i < menus.length; i++) {
      const url = menus[i]['ucenter_menu_url'];
      console.log(visitPath, url);
      if (visitPath.indexOf(url) === 0) return true;
    }

    // return
    return;
  } catch (e) {
    res.jsonFail('校验url失败！', { errName: e.name, errMsg: e.message });
    return;
  }
};
