// path
const os = require('os');
const path = require('path');

/**
 * getTmpPath
 * @param {*} fileName
 * @returns
 */
exports.getTmpPath = (fileName) => {
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, 'qiao-z-coder', fileName);

  return tempFilePath;
};
