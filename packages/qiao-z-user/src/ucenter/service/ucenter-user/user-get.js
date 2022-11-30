// sql
const sql = require('../../sql/ucenter-user-sql.json');

/**
 * ucenter user get
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.id) {
    res.jsonFail('缺少参数id！');
    return;
  }

  // db
  try {
    const rows = await req.db.query(sql.ucenterUserGetById([req.body.id]));

    res.jsonSuccess('query success', { rows: rows });
  } catch (e) {
    res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
  }
};
