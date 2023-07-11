// qiao
const cli = require('qiao-cli');

// config
const config = require('../lib/config.json');

// cmd for gen code
cli.cmd.command('gen <code> <table> <path>').alias('g').description('gen code by table to path').action(handleCode);

// handle code
async function handleCode(code, table, path) {
  // check code
  if (config.codes.indexOf(code) == -1) {
    console.log('error code, see: https://github.com/uikoo9/qiao-z/tree/master/packages/qiao-z-coder#code-list');
    return;
  }

  // gen code
  await require('../codes/' + code + '/coder.js').gen(table, path);
  console.log('success');
}
