/**
 * html
 * @param {*} res
 * @param {*} htmlData
 * @param {*} encoding
 * @returns
 */
const html = (res, htmlData, encoding) => {
  // check
  if (!res) return;
  if (!htmlData) {
    res.send('html: please check html data!');
    return;
  }

  // content type
  const contentType = `text/html; charset=${encoding || 'utf-8'}`;

  // res
  res.response.writeHeader(200, { 'Content-Type': contentType });
  res.response.write(htmlData);
  res.response.end();
};

export default html;
