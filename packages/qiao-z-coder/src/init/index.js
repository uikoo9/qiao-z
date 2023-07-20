// download
const { downloadFile } = require('./download-file.js');

// unzip
const { unzipFile } = require('./unzip-file.js');

// mv
const { mvFiles } = require('./mv-file.js');

/**
 * init
 * @param {*} type
 * @param {*} destPath
 * @returns
 */
exports.init = async (type, destPath) => {
  // d
  const zipPath = await downloadFile(type);
  if (!zipPath) return;

  // unzip
  const unzipFolder = await unzipFile(type, zipPath);
  if (!unzipFolder) return;

  await mvFiles(type, unzipFolder, destPath);
};
