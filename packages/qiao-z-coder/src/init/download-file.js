// download
const { download } = require('qiao-downloader');

// tmp path
const { getTmpPath } = require('./tmp-path.js');

/**
 * downloadFile
 * @param {*} type
 * @returns
 */
exports.downloadFile = async (type) => {
  // url
  let url;
  if (type === 'monorepo') url = 'https://static.vincentqiao.com/codes/monorepo.zip';
  if (type === 'manage') url = 'https://static.vincentqiao.com/codes/manage.zip';
  if (!url) {
    console.log('不支持的type');
    return;
  }

  // p
  const tmpPath = getTmpPath(`${type}.zip`);

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
