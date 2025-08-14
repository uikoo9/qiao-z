// qiao
const { userLogin, userCheck } = require('qiao-z-service');

/**
 * userLoginFn
 * @param {*} req
 * @param {*} res
 */
exports.userLoginFn = async (req, res) => {
  // send
  const json = await userLogin({
    url: global.QZ_CONFIG.app.url,
    appId: global.QZ_CONFIG.app.appId,
    appKey: global.QZ_CONFIG.app.appKey,
    mobile: req.body.mobile,
    code: req.body.code,
  });

  // send
  res.json(json);
};

/**
 * userCheckFn
 * @param {*} req
 * @param {*} res
 */
exports.userCheckFn = async (req, res) => {
  // send
  const json = await userCheck(
    {
      userid: req.headers.userid,
      usertoken: req.headers.usertoken,
    },
    {
      url: global.QZ_CONFIG.app.url,
      appId: global.QZ_CONFIG.app.appId,
      appKey: global.QZ_CONFIG.app.appKey,
    },
  );

  // send
  res.json(json);
};
