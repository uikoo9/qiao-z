// qiao
const { cmd } = require('qiao-cli');

// coder
const { gen } = require('../src/coder.js');

// cmd for gen code
cmd
  .command('gen <table> <dest>')
  .alias('g')
  .description('gen code by table to path')
  .action(async (tableName, destPath) => {
    await gen(tableName, destPath);
  });
