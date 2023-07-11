// template
const template = require('art-template');

// fs
const { fs, mkdir } = require('qiao-file');

// mysql
const { getColumns, getTypes } = require('qiao-mysql');

// string
const { underScoreCaseToCamelCase, firstLetterLower } = require('qiao-string');

/**
 * config
 */
exports.config = require('./config.json');

/**
 * gen data
 * 	tableName
 */
exports.genData = async function (tableName) {
  // class name
  const className = underScoreCaseToCamelCase(tableName);
  const className1 = className.substr(1, className.length);
  const className2 = firstLetterLower(className1);
  console.log(className, className1, className2);

  // data
  let data = {
    className1: className1,
    className2: className2,
    tableName: tableName,
  };
  data = getTableName(tableName, data);

  // columns
  let columns = null;
  try {
    columns = await getColumns(exports.config.db, tableName);
  } catch (e) {
    console.log('table ' + tableName + ' doesn\'t exist!');
    return;
  }

  // params
  const params = [];
  const defaultColumns = exports.config.defaultColumns;
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
    obj.type = getTypes(item.Type);
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
    await mkdir(destFile);

    // write file
    fs.writeFileSync(destFile, data);
  } catch (e) {
    console.log(e);
  }
};
