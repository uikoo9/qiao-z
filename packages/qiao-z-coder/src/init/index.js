// download
const { downloadFile } = require('./download-file.js');

// unzip
const { unzipFile } = require('./unzip-file.js');

// mv
const { mvFiles } = require('./mv-file.js');

/**
 *
 * @param {*} destPath
 */
exports.init = async (destPath) => {
  // d
  const zipPath = await downloadFile();
  if (!zipPath) return;

  // unzip
  const unzipFolder = await unzipFile(zipPath);
  if (!unzipFolder) return;

  await mvFiles(unzipFolder, destPath);
};
