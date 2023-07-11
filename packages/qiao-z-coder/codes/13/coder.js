// path
const path = require('path');

// coder
const { genData, genFileByData } = require('../../lib/qiao-z-coder.js');

/**
 * gen
 * 	tableName 	: table name, like t_blog_type
 * 	destFolder	: dest folder
 */
exports.gen = async function (tableName, destFolder) {
  const data = await genData(tableName);

  console.log();
  console.log('开始解析表结构：');
  console.log('解析结果：');
  console.log(data);

  // gen code
  await genPage(destFolder, data);
  await genEdit(destFolder, data);
  await genSearch(destFolder, data);
};

// gen page
async function genPage(destFolder, data) {
  console.log();
  console.log('开始生成page：');

  const pageTemp = path.resolve(__dirname, './pages/page.art');
  const pageDest = path.resolve(destFolder, `./${data.tableName1}-${data.tableName2}.jsx`);
  await genFileByData(pageTemp, data, pageDest);

  console.log('done');
  console.log();
}

// gen edit
async function genEdit(destFolder, data) {
  console.log();
  console.log('开始生成edit：');

  const pageTemp = path.resolve(__dirname, './pages/edit.art');
  const pageDest = path.resolve(destFolder, `./${data.tableName1}-${data.tableName2}-edit.jsx`);
  await genFileByData(pageTemp, data, pageDest);

  console.log('done');
  console.log();
}

// gen search
async function genSearch(destFolder, data) {
  console.log();
  console.log('开始生成search：');

  const pageTemp = path.resolve(__dirname, './pages/search.art');
  const pageDest = path.resolve(destFolder, `./${data.tableName1}-${data.tableName2}-search.jsx`);
  await genFileByData(pageTemp, data, pageDest);

  console.log('done');
  console.log();
}
