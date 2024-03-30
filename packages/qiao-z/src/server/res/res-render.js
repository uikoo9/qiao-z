// path
import { resolve } from 'path';

// qiao
import { isExists, extname, readFile, writeFile } from 'qiao-file';

// template
import template from 'art-template';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');

/**
 * res.render
 * @param {*} res
 * @param {*} filePath
 * @param {*} data
 * @param {*} cacheFilePath
 * @returns
 */
const render = async (res, filePath, data, cacheFilePath) => {
  // check
  if (!res) return;
  if (!filePath) {
    res.send('render: please check file path!');
    return;
  }

  // final path
  const finalPath = resolve(process.cwd(), filePath);
  if (!(await isExists(finalPath))) {
    res.send('render: file path is not exists');
    return;
  }

  // file
  let file;
  let contentType;
  if (extname(finalPath) == '.html') {
    if (data) {
      file = template(finalPath, data);
      contentType = 'text/html';
    } else {
      file = await readFile(finalPath);
      contentType = 'text/html';
    }
  } else {
    file = await readFile(finalPath);
    contentType = 'text/plain';
  }
  if (file === undefined) {
    res.send('render: read file error');
    return;
  }

  // static
  if (cacheFilePath) {
    const staticPath = typeof cacheFilePath === 'boolean' ? `${finalPath}.html` : `${cacheFilePath}.html`;
    await writeFile(staticPath, file);
  }

  // res
  debug(`render from ${finalPath}`);
  res.response.writeHeader(200, { 'Content-Type': contentType });
  res.response.write(file);
  res.response.end();
};

export default render;
