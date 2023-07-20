// qiao
const { cmd } = require('qiao-cli');

// coder
const { init } = require('../src/init/index.js');

// cmd for gen code
cmd
  .command('gen-init <type> <dest>')
  .description('init monorepo to path')
  .action(async (type, destPath) => {
    await init(type, destPath);
  });
