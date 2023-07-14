/**
 * checkNormalPath
 * @param {*} req
 * @returns
 */
exports.checkNormalPath = function (req) {
  if (global.QIAO_USER_CONFIG && global.QIAO_USER_CONFIG.paths && global.QIAO_USER_CONFIG.paths.length) {
    const normalVisitPath = global.QIAO_USER_CONFIG.paths;
    for (let i = 0; i < normalVisitPath.length; i++) {
      if (req.url.pathname == normalVisitPath[i]) return true;
    }
  }

  return false;
};
