// zip
const { unzip } = require('qiao-zip');

// tmp path
const { getTmpPath } = require('./tmp-path.js');

/**
 * unzipFile
 * @param {*} zipPath
 * @returns
 */
exports.unzipFile = async (zipPath) => {
  // p
  const p = getTmpPath('monorepo-folder');

  // unzip
  const res = await unzip(zipPath, p);
  return res ? p : res;
};
