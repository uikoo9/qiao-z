// sql
const sql = require('../sql/ucenter-user-sql.json');

/**
 * ucenter user list
 * @param {*} req
 * @param {*} res
 */
exports.ucenterUserList = async (req, res) => {
  // vars
  const ucenterUserName = req.body.ucenterUserName;
  const ucenterUserPassword = req.body.ucenterUserPassword;

  // sql and params
  const sqlcount = [sql.ucenterUserListCount];
  const paramscount = [];

  const sqlquery = [sql.ucenterUserListQuery];
  const paramsquery = [];

  // query
  if (ucenterUserName) {
    sqlcount.push(' and t.ucenter_user_name = ?');
    paramscount.push(ucenterUserName);

    sqlquery.push(' and t.ucenter_user_name = ?');
    paramsquery.push(ucenterUserName);
  }
  if (ucenterUserPassword) {
    sqlcount.push(' and t.ucenter_user_password = ?');
    paramscount.push(ucenterUserPassword);

    sqlquery.push(' and t.ucenter_user_password = ?');
    paramsquery.push(ucenterUserPassword);
  }

  // order and page
  sqlquery.push(' order by t.? ? limit ?,?');
  const order = req.body.order || 'desc';
  const orderby = req.body.orderby || 'id';
  const pagesize = parseInt(req.body.rows || 10);
  const pagenumber = parseInt(req.body.page || 1);
  const start = (pagenumber - 1) * pagesize;
  paramsquery.push(req.db.mysql.raw(orderby));
  paramsquery.push(req.db.mysql.raw(order));
  paramsquery.push(start);
  paramsquery.push(pagesize);

  // db
  try {
    const rs = await req.db.query(sqlcount.join(''), paramscount);
    const rows = await req.db.query(sqlquery.join(''), paramsquery);

    // result
    const result = {};
    result.total = rs[0]['tcount'];
    result.rows = rows;
    result.sumpage = Math.ceil(result.total / pagesize);
    result.pagenumber = pagenumber;
    result.pagesize = pagesize;

    res.jsonSuccess('query success', result);
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter user get
 * @param {*} req
 * @param {*} res
 */
exports.ucenterUserGet = async (req, res) => {
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
    const params = [];
    params.push(req.body.id);

    const rows = await req.db.query(sql.ucenterUserGetById, params);
    res.jsonSuccess('query success', { rows: rows });
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter user save
 * @param {*} req
 * @param {*} res
 */
exports.ucenterUserSave = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.ucenterUserName) {
    res.jsonFail('缺少参数ucenterUserName！');
    return;
  }
  if (!req.body.ucenterUserPassword) {
    res.jsonFail('缺少参数ucenterUserPassword！');
    return;
  }

  // vars
  let id = req.body.id;
  const ucenterUserName = req.body.ucenterUserName;
  const ucenterUserPassword = req.body.ucenterUserPassword;

  // vars for userinfo
  const express_userid = req.body.express_userid;
  const express_username = req.body.express_username;

  // db
  try {
    const params = [];

    if (!id) {
      params.push(ucenterUserName);
      params.push(ucenterUserPassword);

      params.push(express_userid || 1);
      params.push(express_username || 'admin');
      params.push(express_userid || 1);
      params.push(express_username || 'admin');

      const rs = await req.db.query(sql.ucenterUserAdd, params);
      id = rs && rs.insertId ? rs.insertId : id;
    } else {
      params.push(ucenterUserName);
      params.push(ucenterUserPassword);

      params.push(express_userid || 1);
      params.push(express_username || 'admin');
      params.push(id);
      params.push(express_userid);

      await req.db.query(sql.ucenterUserEdit, params);
    }

    res.jsonSuccess('save success', { id: id });
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('save failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter user del
 * @param {*} req
 * @param {*} res
 */
exports.ucenterUserDel = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.ids) {
    res.jsonFail('缺少参数ids！');
    return;
  }

  // db
  try {
    const params = [];
    params.push(req.body.ids.split(','));

    await req.db.query(sql.ucenterUserDel, params);
    res.jsonSuccess('del success');
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('del failed', { errName: e.name, errMsg: e.message });
  }
};
