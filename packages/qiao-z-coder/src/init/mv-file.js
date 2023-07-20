// file
const { path, mv } = require('qiao-file');

/**
 * mvFiles
 * @param {*} type
 * @param {*} srcPath
 * @param {*} destPath
 */
exports.mvFiles = async (type, srcPath, destPath) => {
  // path
  const finalSrcPath = path.resolve(srcPath, type);
  const finalDestPath = path.resolve(destPath, type);

  console.log();
  console.log(`src: ${finalSrcPath}`);
  console.log(`dest: ${finalDestPath}`);
  const res = await mv(finalSrcPath, finalDestPath);
  console.log(`res:${res}`);
};
