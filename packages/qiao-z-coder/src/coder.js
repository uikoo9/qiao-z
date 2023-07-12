// path
const path = require('path');

// coder
const { parseTable } = require('./parse-table.js');
const { genFileByData } = require('./gen-file.js');

/**
 * gen
 * 	tableName 	: table name, like t_blog_type
 * 	destFolder	: dest folder
 */
exports.gen = async function (tableName, destFolder) {
  const data = await parseTable(tableName);

  // page
  const pageDest = path.resolve(destFolder, `./${data.tableName1}-${data.tableName2}.jsx`);
  await genFile('./pages/page.art', pageDest, data);

  // edit
  const editDest = path.resolve(destFolder, `./${data.tableName1}-${data.tableName2}-edit.jsx`);
  await genFile('./pages/edit.art', editDest, data);

  // search
  const searchDest = path.resolve(destFolder, `./${data.tableName1}-${data.tableName2}-search.jsx`);
  await genFile('./pages/search.art', searchDest, data);

  // service web
  const serviceWebDest = path.resolve(destFolder, `./${data.tableName1}-${data.tableName2}-service.js`);
  await genFile('./service/service.art', serviceWebDest, data);

  // controller
  const controllerDest = path.resolve(destFolder, `./${data.tableName1}/controller/${data.className1}Controller.js`);
  await genFile('./server/controller.art', controllerDest, data);

  // service
  const serviceDest = path.resolve(destFolder, `./${data.tableName1}/service/${data.className1}Service.js`);
  await genFile('./server/service.art', serviceDest, data);

  // model
  const modelDest = path.resolve(destFolder, `./${data.tableName1}/model/${data.className1}Model.js`);
  await genFile('./server/model.art', modelDest, data);

  //
  const sqlDest = path.resolve(destFolder, `./${data.tableName1}/model/${data.tableName1}-${data.tableName2}-sql.json`);
  await genFile('./server/sql.art', sqlDest, data);
};

// gen file
async function genFile(pageTemp, pageDest, data) {
  console.log();
  console.log(`生成模板：${pageTemp}`);

  const finalPageTemp = path.resolve(__dirname, pageTemp);
  await genFileByData(finalPageTemp, data, pageDest);

  console.log('done');
  console.log();
}
