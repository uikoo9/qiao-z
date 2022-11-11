// encode
const encode = require('qiao-encode');

// sql
const sql = require('../../sql/ucenter-user-sql.json');

/**
 * ucenter user reg
 * @param {*} req 
 * @param {*} res 
 */
module.exports = async (req, res) => {
    // check
    if (!req.body) {
        res.jsonFail('缺少参数！');
        return;
    }
    if (!req.body.username) {
        res.jsonFail('缺少参数username！');
        return;
    }
    if (!req.body.password) {
        res.jsonFail('缺少参数password！');
        return;
    }
    if (!req.body.usercode) {
        res.jsonFail('缺少参数usercode！');
        return;
    }

    // db
    try {
        // consts for code
        const type = 'reg';
        const username = req.body.username;
        const usercode = req.body.usercode;

        // check code
        const codes = await req.db.query(sql.ucenterCodeGet, [type, username]);
        if (codes.length != 1) {
            res.jsonFail('请先获取手机验证码！');
            return;
        }
        if (usercode != codes[0].ucenter_code_code) {
            res.jsonFail('手机验证码错误！');
            return;
        }

        // consts for reg
        const password = req.body.password;
        const encryptPassword = encode.AESEncrypt(password, global.QIAO_USER_CONFIG.encryptKey);

        // check user
        const usersForMobile = await req.db.query(sql.ucenterUserGetByMobile, [username]);
        if (usersForMobile && usersForMobile.length) {
            res.jsonFail('手机号已注册！');
            return;
        }

        // reg
        await req.db.query(sql.ucenterUserReg, [username, encryptPassword]);

        // del code
        await req.db.query(sql.ucenterCodeDel, [type, username]);

        // send
        res.jsonSuccess('注册成功！');
    } catch (e) {
        res.jsonFail('注册失败', { errName: e.name, errMsg: e.message });
    }
};