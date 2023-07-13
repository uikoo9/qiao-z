// sql
const sql = require('../sql/ucenter-roleuser-sql.json');

/**
 * ucenter roleuser list
 * @param {*} req
 * @param {*} res
 */
exports.ucenterRoleuserList = async (req, res) => {
  // vars
  const ucenterRoleId = req.body.ucenterRoleId;
  const ucenterUserId = req.body.ucenterUserId;

  // sql and params
  const sqlcount = [sql.ucenterRoleuserListCount];
  const paramscount = [];

  const sqlquery = [sql.ucenterRoleuserListQuery];
  const paramsquery = [];

  // query
  if (ucenterRoleId) {
    sqlcount.push(' and t.ucenter_role_id = ?');
    paramscount.push(ucenterRoleId);

    sqlquery.push(' and t.ucenter_role_id = ?');
    paramsquery.push(ucenterRoleId);
  }
  if (ucenterUserId) {
    sqlcount.push(' and t.ucenter_user_id = ?');
    paramscount.push(ucenterUserId);

    sqlquery.push(' and t.ucenter_user_id = ?');
    paramsquery.push(ucenterUserId);
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
 * ucenter roleuser get
 * @param {*} req
 * @param {*} res
 */
exports.ucenterRoleuserGet = async (req, res) => {
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

    const rows = await req.db.query(sql.ucenterRoleuserGetById, params);
    res.jsonSuccess('query success', { rows: rows });
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter roleuser save
 * @param {*} req
 * @param {*} res
 */
exports.ucenterRoleuserSave = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.ucenterRoleId) {
    res.jsonFail('缺少参数ucenterRoleId！');
    return;
  }
  if (!req.body.ucenterUserId) {
    res.jsonFail('缺少参数ucenterUserId！');
    return;
  }

  // vars
  let id = req.body.id;
  const ucenterRoleId = req.body.ucenterRoleId;
  const ucenterUserId = req.body.ucenterUserId;

  // vars for userinfo
  const express_userid = req.body.express_userid;
  const express_username = req.body.express_username;

  // db
  try {
    const params = [];

    if (!id) {
      params.push(ucenterRoleId);
      params.push(ucenterUserId);

      params.push(express_userid || 1);
      params.push(express_username || 'admin');
      params.push(express_userid || 1);
      params.push(express_username || 'admin');

      const rs = await req.db.query(sql.ucenterRoleuserAdd, params);
      id = rs && rs.insertId ? rs.insertId : id;
    } else {
      params.push(ucenterRoleId);
      params.push(ucenterUserId);

      params.push(express_userid || 1);
      params.push(express_username || 'admin');
      params.push(id);
      params.push(express_userid);

      await req.db.query(sql.ucenterRoleuserEdit, params);
    }

    res.jsonSuccess('save success', { id: id });
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('save failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter roleuser del
 * @param {*} req
 * @param {*} res
 */
exports.ucenterRoleuserDel = async (req, res) => {
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

    await req.db.query(sql.ucenterRoleuserDel, params);
    res.jsonSuccess('del success');
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('del failed', { errName: e.name, errMsg: e.message });
  }
};
