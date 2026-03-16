/**
 * res.send
 * @param {*} res
 * @param {*} msg
 * @param {*} mimetype
 * @returns
 */
const send = (res, msg, mimetype) => {
  if (!res || msg === undefined) return;

  res.head(200, { 'Content-Type': mimetype || 'text/plain' });
  res.end(msg);
};

export default send;
