// file
const { path, mv } = require('qiao-file');

/**
 * mvFiles
 * @param {*} srcPath
 * @param {*} destPath
 */
exports.mvFiles = async (srcPath, destPath) => {
  // path
  const finalSrcPath = path.resolve(srcPath, 'monorepo');
  const finalDestPath = path.resolve(destPath, 'monorepo');

  console.log();
  console.log(`src: ${finalSrcPath}`);
  console.log(`dest: ${finalDestPath}`);
  const res = await mv(finalSrcPath, finalDestPath);
  console.log(`res:${res}`);
};
