// download
const { download } = require('qiao-downloader');

// tmp path
const { getTmpPath } = require('./tmp-path.js');

/**
 * downloadFile
 */
exports.downloadFile = async () => {
  // url
  const url = 'https://static.insistime.com/codes/monorepo.zip';

  // p
  const tmpPath = getTmpPath('monorepo.zip');

  // log
  console.log();
  console.log(`开始下载：${url}`);
  console.log(`下载到：${tmpPath}`);

  // download
  const res = await download(url, tmpPath, { timeout: 5000 });
  console.log(`下载结果：${res}`);
  console.log();

  return res;
};
