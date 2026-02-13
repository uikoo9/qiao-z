// qiao
const { userInfo } = require('qiao-z-service');

/**
 * userInfoFn
 * @param {*} req
 * @param {*} res
 */
exports.userInfoFn = async (req, res) => {
  // send
  const json = await userInfo({
    url: global.QZ_CONFIG.user.url,
    userid: req.headers.userid,
  });

  // send
  res.json(json);
};
