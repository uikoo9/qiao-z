// zip
const { unzip } = require('qiao-zip');

// tmp path
const { getTmpPath } = require('./tmp-path.js');

/**
 * unzipFile
 * @param {*} type
 * @param {*} zipPath
 * @returns
 */
exports.unzipFile = async (type, zipPath) => {
  // p
  const p = getTmpPath(`${type}-folder`);

  // unzip
  const res = await unzip(zipPath, p);
  return res ? p : res;
};
