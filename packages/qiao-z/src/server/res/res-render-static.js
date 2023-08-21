// path
import { resolve } from 'path';

// qiao
import { isExists, extname, readFile, writeFile } from 'qiao-file';

// template
import template from 'art-template';

/**
 * res.renderAndStatic
 * @param {*} res
 * @param {*} filePath
 * @param {*} data
 * @returns
 */
const renderAndStatic = async (res, filePath, data) => {
  // check
  if (!res) return;
  if (!filePath) {
    res.send('renderAndStatic: please check file path!');
    return;
  }
  if (extname(filePath) !== '.html') {
    res.send('renderAndStatic: only support html');
    return;
  }

  // final path
  let finalPath = resolve(process.cwd(), filePath);
  if (!(await isExists(finalPath))) {
    res.send('renderAndStatic: file path is not exists');
    return;
  }

  // static path
  const staticPath = `${finalPath}.html`;
  if (await isExists(staticPath)) {
    console.log(`renderAndStatic from ${staticPath}`);

    const file = await readFile(staticPath);
    render(res, file);
    return;
  }

  // file
  const file = template(finalPath, data || {});
  if (!file) {
    res.send('render: read file error');
    return;
  }

  // local
  await writeFile(staticPath, file);

  // render html
  console.log(`renderAndStatic from ${finalPath}`);
  render(res, file);
};

// render
function render(res, file) {
  res.response.writeHeader(200, { 'Content-Type': 'text/html' });
  res.response.write(file);
  res.response.end();
}

//
export default renderAndStatic;
