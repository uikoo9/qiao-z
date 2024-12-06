// qiao
const { appUpdate } = require('qiao-z-service');

/**
 * appUpdateFn
 * @param {*} req
 * @param {*} res
 */
exports.appUpdateFn = async (req, res) => {
  // send
  const json = await appUpdate({
    url: global.QZ_CONFIG.app.url,
    appId: global.QZ_CONFIG.app.appId,
    appKey: global.QZ_CONFIG.app.appKey,
    appName: req.body.appName,
  });

  // send
  res.json(json);
};
