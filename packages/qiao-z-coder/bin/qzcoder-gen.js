// qiao
const { cmd } = require('qiao-cli');

// coder
const { gen } = require('../src/gen/coder.js');

// cmd for gen code
cmd
  .command('gen <table> <dest>')
  .description('gen code by table to path')
  .action(async (tableName, destPath) => {
    await gen(tableName, destPath);
  });
