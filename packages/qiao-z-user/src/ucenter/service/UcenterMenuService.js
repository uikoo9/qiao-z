// sql
const sql = require('../sql/ucenter-menu-sql.json');

/**
 * ucenter menu list
 * @param {*} req
 * @param {*} res
 */
exports.ucenterMenuList = async (req, res) => {
  // consts
  const ucenterMenuParent = req.body.ucenterMenuParent;
  const ucenterMenuSn = req.body.ucenterMenuSn;
  const ucenterMenuTitle = req.body.ucenterMenuTitle;
  const ucenterMenuUrl = req.body.ucenterMenuUrl;

  // sql and params
  const sqlcount = [sql.ucenterMenuListCount];
  const paramscount = [];

  const sqlquery = [sql.ucenterMenuListQuery];
  const paramsquery = [];

  // query
  if (ucenterMenuParent) {
    sqlcount.push(' and t.ucenter_menu_parent = ?');
    paramscount.push(ucenterMenuParent);

    sqlquery.push(' and t.ucenter_menu_parent = ?');
    paramsquery.push(ucenterMenuParent);
  }
  if (ucenterMenuSn) {
    sqlcount.push(' and t.ucenter_menu_sn = ?');
    paramscount.push(ucenterMenuSn);

    sqlquery.push(' and t.ucenter_menu_sn = ?');
    paramsquery.push(ucenterMenuSn);
  }
  if (ucenterMenuTitle) {
    sqlcount.push(' and t.ucenter_menu_title = ?');
    paramscount.push(ucenterMenuTitle);

    sqlquery.push(' and t.ucenter_menu_title = ?');
    paramsquery.push(ucenterMenuTitle);
  }
  if (ucenterMenuUrl) {
    sqlcount.push(' and t.ucenter_menu_url = ?');
    paramscount.push(ucenterMenuUrl);

    sqlquery.push(' and t.ucenter_menu_url = ?');
    paramsquery.push(ucenterMenuUrl);
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
    res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter menu get
 * @param {*} req
 * @param {*} res
 */
exports.ucenterMenuGet = async (req, res) => {
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
    const rows = await req.db.query(sql.ucenterMenuGetById, [req.body.id]);

    res.jsonSuccess('query success', { rows: rows });
  } catch (e) {
    res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter menu save
 * @param {*} req
 * @param {*} res
 */
exports.ucenterMenuSave = async (req, res) => {
  // check
  if (!req.body) {
    res.jsonFail('缺少参数！');
    return;
  }
  if (!req.body.ucenterMenuParent) {
    res.jsonFail('缺少参数ucenterMenuParent！');
    return;
  }
  if (!req.body.ucenterMenuSn) {
    res.jsonFail('缺少参数ucenterMenuSn！');
    return;
  }
  if (!req.body.ucenterMenuTitle) {
    res.jsonFail('缺少参数ucenterMenuTitle！');
    return;
  }
  if (!req.body.ucenterMenuUrl) {
    res.jsonFail('缺少参数ucenterMenuUrl！');
    return;
  }

  // consts
  let id = req.body.id;
  const ucenterMenuParent = req.body.ucenterMenuParent;
  const ucenterMenuSn = req.body.ucenterMenuSn;
  const ucenterMenuTitle = req.body.ucenterMenuTitle;
  const ucenterMenuUrl = req.body.ucenterMenuUrl;

  // consts for userinfo
  const express_userid = req.body.express_userid;
  const express_username = req.body.express_username;

  // db
  try {
    const params = [];

    if (!id) {
      params.push(ucenterMenuParent);
      params.push(ucenterMenuSn);
      params.push(ucenterMenuTitle);
      params.push(ucenterMenuUrl);

      params.push(express_userid || 1);
      params.push(express_username || 'admin');
      params.push(express_userid || 1);
      params.push(express_username || 'admin');

      const rs = await req.db.query(sql.ucenterMenuAdd, params);
      id = rs && rs.insertId ? rs.insertId : id;
    } else {
      params.push(ucenterMenuParent);
      params.push(ucenterMenuSn);
      params.push(ucenterMenuTitle);
      params.push(ucenterMenuUrl);

      params.push(express_userid || 1);
      params.push(express_username || 'admin');
      params.push(id);

      await req.db.query(sql.ucenterMenuEdit, params);
    }

    res.jsonSuccess('save success', { id: id });
  } catch (e) {
    res.jsonFail('save failed', { errName: e.name, errMsg: e.message });
  }
};

/**
 * ucenter menu del
 * @param {*} req
 * @param {*} res
 */
exports.ucenterMenuDel = async (req, res) => {
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
    await req.db.query(sql.ucenterMenuDel, req.body.ids.split(','));
    res.jsonSuccess('del success');
  } catch (e) {
    res.jsonFail('del failed', { errName: e.name, errMsg: e.message });
  }
};
