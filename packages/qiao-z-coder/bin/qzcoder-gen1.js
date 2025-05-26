// qiao
const { cmd } = require('qiao-cli');

// coder
const { gen1 } = require('../src/gen/coder.js');

// cmd for gen code
cmd
  .command('gen1 <table> <dest>')
  .description('gen1 code by table to path')
  .action(async (tableName, destPath) => {
    await gen1(tableName, destPath);
  });
