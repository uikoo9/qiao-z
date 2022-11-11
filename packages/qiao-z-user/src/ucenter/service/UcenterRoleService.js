// sql
const sql = require('../sql/ucenter-role-sql.json');

/**
 * ucenter role list
 * @param {*} req 
 * @param {*} res 
 */
exports.ucenterRoleList = async (req, res) => {
    // consts
    const ucenterRoleName = req.body.ucenterRoleName;
    const ucenterRoleUrl = req.body.ucenterRoleUrl;

    // sql and params
    const sqlcount = [sql.ucenterRoleListCount];
    const paramscount = [];

    const sqlquery = [sql.ucenterRoleListQuery];
    const paramsquery = [];

    // query
    if (ucenterRoleName) {
        sqlcount.push(' and t.ucenter_role_name = ?');
        paramscount.push(ucenterRoleName);

        sqlquery.push(" and t.ucenter_role_name = ?");
        paramsquery.push(ucenterRoleName);
    }
    if (ucenterRoleUrl) {
        sqlcount.push(' and t.ucenter_role_url = ?');
        paramscount.push(ucenterRoleUrl);

        sqlquery.push(" and t.ucenter_role_url = ?");
        paramsquery.push(ucenterRoleUrl);
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
 * ucenter role get
 * @param {*} req 
 * @param {*} res 
 */
exports.ucenterRoleGet = async (req, res) => {
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
        const rows = await req.db.query(sql.ucenterRoleGetById, [req.body.id]);

        res.jsonSuccess('query success', { rows: rows });
    } catch (e) {
        res.jsonFail('query failed', { errName: e.name, errMsg: e.message });
    }
};

/**
 * ucenter role save
 * @param {*} req 
 * @param {*} res 
 */
exports.ucenterRoleSave = async (req, res) => {
    // check
    if (!req.body) {
        res.jsonFail('缺少参数！');
        return;
    }
    if (!req.body.ucenterRoleName) {
        res.jsonFail('缺少参数ucenterRoleName！');
        return;
    }
    if (!req.body.ucenterRoleUrl) {
        res.jsonFail('缺少参数ucenterRoleUrl！');
        return;
    }

    // consts
    let id = req.body.id;
    const ucenterRoleName = req.body.ucenterRoleName;
    const ucenterRoleUrl = req.body.ucenterRoleUrl;


    // consts for userinfo
    const express_userid = req.body.express_userid;
    const express_username = req.body.express_username;

    // db
    try {
        const params = [];

        if (!id) {
            params.push(ucenterRoleName);
            params.push(ucenterRoleUrl);

            params.push(express_userid || 1);
            params.push(express_username || 'admin');
            params.push(express_userid || 1);
            params.push(express_username || 'admin');

            const rs = await req.db.query(sql.ucenterRoleAdd, params);
            id = rs && rs.insertId ? rs.insertId : id;
        } else {
            params.push(ucenterRoleName);
            params.push(ucenterRoleUrl);

            params.push(express_userid || 1);
            params.push(express_username || 'admin');
            params.push(id);

            await req.db.query(sql.ucenterRoleEdit, params);
        }

        res.jsonSuccess('save success', { id: id });
    } catch (e) {
        res.jsonFail('save failed', { errName: e.name, errMsg: e.message });
    }
};

/**
 * ucenter role del
 * @param {*} req 
 * @param {*} res 
 */
exports.ucenterRoleDel = async (req, res) => {
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
        await req.db.query(sql.ucenterRoleDel, req.body.ids.split(','));
        res.jsonSuccess('del success');
    } catch (e) {
        res.jsonFail('del failed', { errName: e.name, errMsg: e.message });
    }
};