// path
import { resolve } from 'path';

// qiao
import { isExists, extname, readFile } from 'qiao-file';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');

/**
 * res.staticRender
 * @param {*} res
 * @param {*} filePath
 * @param {*} data
 * @returns
 */
const staticRender = async (res, filePath) => {
  // check
  if (!res) return;
  if (!filePath) return;
  if (extname(filePath) !== '.html') return;

  // static path
  let finalPath = resolve(process.cwd(), filePath);
  const staticPath = `${finalPath}.html`;
  if (!(await isExists(staticPath))) return;

  debug(`staticRender from ${staticPath}`);
  const file = await readFile(staticPath);
  res.response.writeHeader(200, { 'Content-Type': 'text/html' });
  res.response.write(file);
  res.response.end();
  return true;
};

//
export default staticRender;
