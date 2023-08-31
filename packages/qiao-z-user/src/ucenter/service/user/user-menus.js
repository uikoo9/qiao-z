// sql
const sql = require('../../sql/user-sql.json');

/**
 * ucenter user menus
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }

  // user id
  const express_userid = req.body.express_userid;

  // db
  try {
    const rows = await req.db.query(sql.userMenusRoot, [express_userid]);

    res.jsonSuccess('query success', { rows: rows });
  } catch (e) {
    res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
  }
};
