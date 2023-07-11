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
  console.log(data);

  // gen code
  genController(destFolder, data);
  genService(destFolder, data);
  genModel(destFolder, data);
  genSql(destFolder, data);

  return;
};

// gen controller
function genController(destFolder, data) {
  const pageTemp = path.resolve(__dirname, './server/controller.art');
  const pageDest = path.resolve(destFolder, `./lib/${data.tableName1}/controller/${data.className1}Controller.js`);
  genFileByData(pageTemp, data, pageDest);
}

// gen service
function genService(destFolder, data) {
  const pageTemp = path.resolve(__dirname, './server/service.art');
  const pageDest = path.resolve(destFolder, `./lib/${data.tableName1}/service/${data.className1}Service.js`);
  genFileByData(pageTemp, data, pageDest);
}

// gen model
function genModel(destFolder, data) {
  const modelTemp = path.resolve(__dirname, './server/model.art');
  const modelDest = path.resolve(destFolder, `./lib/${data.tableName1}/model/${data.className1}Model.js`);
  genFileByData(modelTemp, data, modelDest);
}

// gen sql
function genSql(destFolder, data) {
  const sqlTemp = path.resolve(__dirname, './server/sql.art');
  const sqlDest = path.resolve(
    destFolder,
    `./lib/${data.tableName1}/model/${data.tableName1}-${data.tableName2}-sql.json`,
  );
  genFileByData(sqlTemp, data, sqlDest);
}
