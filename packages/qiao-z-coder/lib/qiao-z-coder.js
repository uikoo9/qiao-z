// template
const template = require('art-template');

// fs
const { path, isExists, mkdir, writeFile } = require('qiao-file');

// string
const { underScoreCaseToCamelCase, firstLetterLower } = require('qiao-string');

// mysql
const config = require('./config.json');
const db = require('qiao-mysql')(config.db);

/**
 * gen data
 * 	tableName
 */
exports.genData = async function (tableName) {
  console.log(`开始解析表格名：${tableName}`);
  console.log('解析结果：');

  // class name
  const className = underScoreCaseToCamelCase(tableName);
  const className1 = className.substring(1, className.length);
  const className2 = firstLetterLower(className1);

  // data
  let data = {
    className1: className1,
    className2: className2,
    tableName: tableName,
  };
  data = getTableName(tableName, data);
  console.log(data);

  // columns
  let columns = null;
  try {
    columns = await db.getColumns(tableName);
  } catch (e) {
    console.log(e);
    console.log('table ' + tableName + ' doesn\'t exist!');
    return;
  }

  // params
  const params = [];
  const defaultColumns = config.defaultColumns;
  for (let i = 0; i < columns.length; i++) {
    const item = columns[i];

    // name1
    const name1 = item.Field;
    if (defaultColumns.indexOf(name1) > -1) continue;

    // name2
    const name3 = underScoreCaseToCamelCase(name1);
    const name2 = firstLetterLower(name3);

    // obj
    const obj = {};
    obj.type = db.getTypes(item.Type);
    obj.name1 = name1;
    obj.name2 = name2;
    obj.name3 = name3;

    // params
    params.push(obj);
  }
  data.params = params;

  // return
  return data;
};

// get table name
function getTableName(tableName, data) {
  const tableNames = tableName.split('_');

  let tableName1 = null;
  let tableName2 = null;
  const tableTemp = [];
  for (let i = 0; i < tableNames.length; i++) {
    if (i == 1) tableName1 = tableNames[i];

    if (i > 1) tableTemp.push(tableNames[i]);
  }
  tableName2 = tableTemp.join('-');

  data.tableName1 = tableName1;
  data.tableName2 = tableName2;

  return data;
}

/**
 * genFileByData
 * 	templateFile : template file path
 * 	templateData : template data
 * 	destFile : dest file path
 */
exports.genFileByData = async function (templateFile, templateData, destFile) {
  // check temp file
  if (!templateFile) {
    console.log('need template file path!');
    return;
  }

  // check temp data
  if (!templateData) {
    console.log('need template data!');
    return;
  }

  // check dest file
  if (!destFile) {
    console.log('need dest file path!');
    return;
  }

  // gen file
  try {
    // data
    const data = template(templateFile, templateData);

    // mkdir
    const dirname = path.dirname(destFile);
    const pathIsExists = await isExists(dirname);
    if (!pathIsExists) await mkdir(dirname);

    // write file
    await writeFile(destFile, data);
  } catch (e) {
    console.log(e);
  }
};
