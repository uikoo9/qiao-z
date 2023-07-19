// template
const template = require('art-template');

// fs
const { path, isExists, mkdir, writeFile } = require('qiao-file');

/**
 * genFileByData
 * @param {*} templateFile
 * @param {*} templateData
 * @param {*} destFile
 * @returns
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
