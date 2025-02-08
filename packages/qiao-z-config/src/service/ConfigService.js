// qiao
const { config } = require('qiao-z-service');

/**
 * configFn
 * @param {*} req
 * @param {*} res
 */
exports.configFn = async (req, res) => {
  // send
  const json = await config({
    url: global.QZ_CONFIG.config.url,
    appId: global.QZ_CONFIG.config.appId,
    appKey: global.QZ_CONFIG.config.appKey,
    type: req.body.type,
  });

  // send
  res.json(json);
};
