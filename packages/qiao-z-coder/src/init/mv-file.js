// file
const { path, lsdir, cp } = require('qiao-file');

/**
 * mvFiles
 * @param {*} srcPath
 * @param {*} destPath
 */
exports.mvFiles = async (srcPath, destPath) => {
  // check
  const finalSrcPath = path.resolve(srcPath, 'monorepo');
  const srcRes = await lsdir(finalSrcPath);
  if (!srcRes || !srcRes.files) return;

  // files
  const finalFiles = srcRes.files.filter((item) => item.name && item.name !== '.DS_Store');

  // cp
  const success = [];
  const fail = [];
  for (let i = 0; i < finalFiles.length; i++) {
    const item = finalFiles[i];
    const dest = path.resolve(destPath, item.name);
    const res = await cp(item.path, dest);
    if (res) {
      success.push(dest);
    } else {
      fail.push(dest);
    }
  }

  console.log('cp files, success:', success);
  console.log('cp files, fail:', fail);
};
