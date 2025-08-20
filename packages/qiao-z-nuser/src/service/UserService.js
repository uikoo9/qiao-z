// qiao
const { userLogin } = require('qiao-z-service');

/**
 * userLoginFn
 * @param {*} req
 * @param {*} res
 */
exports.userLoginFn = async (req, res) => {
  // send
  const json = await userLogin({
    url: global.QZ_CONFIG.user.url,
    appId: global.QZ_CONFIG.user.appId,
    appKey: global.QZ_CONFIG.user.appKey,
    mobile: req.body.mobile,
    code: req.body.code,
  });

  // send
  res.json(json);
};
