// qiao
const { userInfo, userSearch } = require('qiao-z-service');

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

/**
 * userSearchFn
 * @param {*} req
 * @param {*} res
 */
exports.userSearchFn = async (req, res) => {
  // send
  const json = await userSearch({
    url: global.QZ_CONFIG.user.url,
    userid: req.body.userid,
  });

  // send
  res.json(json);
};
