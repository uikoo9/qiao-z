// cos
const { cosToken, cosSign } = require('qiao-z-service');

/**
 * cosToken
 * @param {*} req
 * @param {*} res
 */
exports.cosToken = async (req, res) => {
  // send
  const json = await cosToken({
    url: global.QZ_CONFIG.cosServer.url,
    appId: global.QZ_CONFIG.cosServer.appId,
    appKey: global.QZ_CONFIG.cosServer.appKey,
    cosSecretId: global.QZ_CONFIG.cos.SecretId,
    cosSecretKey: global.QZ_CONFIG.cos.SecretKey,
    cosBucket: global.QZ_CONFIG.cos.Bucket,
    cosRegion: global.QZ_CONFIG.cos.Region,
    durationSeconds: global.QZ_CONFIG.cos.durationSeconds,
    allowPrefix: 'models/*',
  });

  // send
  res.json(json);
};

/**
 * cosSign
 * @param {*} req
 * @param {*} res
 */
exports.cosSign = async (req, res) => {
  // send
  const json = await exports.cosSignByReq(req.body.filePath, req.body.formatWebp, req.body.formatWidth);

  // send
  res.json(json);
};

/**
 * cosSignByReq
 * @param {*} filePath
 * @param {*} formatWebp
 * @param {*} formatWidth
 */
exports.cosSignByReq = async (filePath, formatWebp, formatWidth) => {
  return await cosSign({
    url: global.QZ_CONFIG.cosServer.url,
    appId: global.QZ_CONFIG.cosServer.appId,
    appKey: global.QZ_CONFIG.cosServer.appKey,
    cosSecretId: global.QZ_CONFIG.cos.SecretId,
    cosSecretKey: global.QZ_CONFIG.cos.SecretKey,
    cosBucket: global.QZ_CONFIG.cos.Bucket,
    cosRegion: global.QZ_CONFIG.cos.Region,
    signKey: global.QZ_CONFIG.cos.signKey,
    signTimeout: global.QZ_CONFIG.cos.signTimeout,
    cdnHost: global.QZ_CONFIG.cos.cdnHost,
    filePath: filePath,
    formatWebp: formatWebp,
    formatWidth: formatWidth,
  });
};
