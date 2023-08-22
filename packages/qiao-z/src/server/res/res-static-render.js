// path
import { resolve } from 'path';

// qiao
import { isExists, extname, readFile } from 'qiao-file';

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

  // final path
  let finalPath = resolve(process.cwd(), filePath);
  if (!(await isExists(finalPath))) return;

  // static path
  const staticPath = `${finalPath}.html`;
  if (!(await isExists(staticPath))) return;

  console.log(`staticRender from ${staticPath}`);
  const file = await readFile(staticPath);
  res.response.writeHeader(200, { 'Content-Type': 'text/html' });
  res.response.write(file);
  res.response.end();
  return true;
};

//
export default staticRender;
