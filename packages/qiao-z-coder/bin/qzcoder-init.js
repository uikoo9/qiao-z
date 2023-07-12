// path
const path = require('path');

// qiao
const cli = require('qiao-cli');

// ajax
const ajax = require('qiao-request');

// encode
const encode = require('qiao-encode');

// zip
const zip = require('qiao-zip');

// config
const config = require('../src/config.json');

// cmd for init code
cli.cmd.command('init <code> <path>').alias('i').description('init code to path').action(initCode);

// init code
async function initCode(code, dest) {
  // check code
  if (config.codes.indexOf(code) == -1) {
    console.log('error code, see: https://github.com/uikoo9/qiao-z/tree/master/packages/qiao-z-coder#code-list');
    return;
  }

  // download zip
  const zipUrl = config.host + code + '/init.zip';
  const tmpdir = require('os').tmpdir();
  const tmpName = encode.uuid() + '.zip';
  const tmpPath = path.resolve(tmpdir, tmpName);
  await ajax.download(zipUrl, tmpPath);

  // init code
  zip.unzip(tmpPath, dest);
}
