// qiao
const { cmd } = require('qiao-cli');

// coder
const { init } = require('../src/init/index.js');

// cmd for gen code
cmd
  .command('gen-init <dest>')
  .description('init monorepo to path')
  .action(async (destPath) => {
    await init(destPath);
  });
