/**
 * checkNormalPath
 * @param {*} req
 * @returns
 */
exports.checkNormalPath = function (req) {
  if (global.QZ_CONFIG && global.QZ_CONFIG.paths && global.QZ_CONFIG.paths.length) {
    const normalVisitPath = global.QZ_CONFIG.paths;
    for (let i = 0; i < normalVisitPath.length; i++) {
      if (req.url.pathname == normalVisitPath[i]) return true;
    }
  }

  return false;
};
