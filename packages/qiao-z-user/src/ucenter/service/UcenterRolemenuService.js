// sql
const sql = require('../sql/ucenter-rolemenu-sql.json');

/**
 * ucenter rolemenu list
 * @param {*} req
 * @param {*} res
 */
exports.ucenterRolemenuList = async (req, res) => {
  // vars
  const ucenterRoleId = req.body.ucenterRoleId;
  const ucenterMenuId = req.body.ucenterMenuId;

  // sql and params
  const sqlcount = [sql.ucenterRolemenuListCount];
  const paramscount = [];

  const sqlquery = [sql.ucenterRolemenuListQuery];
  const paramsquery = [];

  // query
  if (ucenterRoleId) {
    sqlcount.push(' and t.ucenter_role_id = ?');
    paramscount.push(ucenterRoleId);

    sqlquery.push(' and t.ucenter_role_id = ?');
    paramsquery.push(ucenterRoleId);
  }
  if (ucenterMenuId) {
    sqlcount.push(' and t.ucenter_menu_id = ?');
    paramscount.push(ucenterMenuId);

    sqlquery.push(' and t.ucenter_menu_id = ?');
    paramsquery.push(ucenterMenuId);
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
 * ucenter rolemenu get
 * @param {*} req
 * @param {*} res
 */
exports.ucenterRolemenuGet = async (req, res) => {
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

    const rows = await req.db.query(sql.ucenterRolemenuGetById, params);
    res.jsonSuccess('query success', { rows: rows });
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter rolemenu save
 * @param {*} req
 * @param {*} res
 */
exports.ucenterRolemenuSave = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.ucenterRoleId) {
    res.jsonFail('缺少参数ucenterRoleId！');
    return;
  }
  if (!req.body.ucenterMenuId) {
    res.jsonFail('缺少参数ucenterMenuId！');
    return;
  }

  // vars
  let id = req.body.id;
  const ucenterRoleId = req.body.ucenterRoleId;
  const ucenterMenuId = req.body.ucenterMenuId;

  // vars for userinfo
  const express_userid = req.body.express_userid;
  const express_username = req.body.express_username;

  // db
  try {
    const params = [];

    if (!id) {
      params.push(ucenterRoleId);
      params.push(ucenterMenuId);

      params.push(express_userid || 1);
      params.push(express_username || 'admin');
      params.push(express_userid || 1);
      params.push(express_username || 'admin');

      const rs = await req.db.query(sql.ucenterRolemenuAdd, params);
      id = rs && rs.insertId ? rs.insertId : id;
    } else {
      params.push(ucenterRoleId);
      params.push(ucenterMenuId);

      params.push(express_userid || 1);
      params.push(express_username || 'admin');
      params.push(id);
      params.push(express_userid);

      await req.db.query(sql.ucenterRolemenuEdit, params);
    }

    res.jsonSuccess('save success', { id: id });
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('save failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter rolemenu del
 * @param {*} req
 * @param {*} res
 */
exports.ucenterRolemenuDel = async (req, res) => {
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

    await req.db.query(sql.ucenterRolemenuDel, params);
    res.jsonSuccess('del success');
  } catch (e) {
    req.logger.error(e);
    res.jsonFail('del failed', { errName: e.name, errMsg: e.message });
  }
};
