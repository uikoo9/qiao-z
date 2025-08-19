/**
 * streamingStart
 * @param {*} res
 */
export const streamingStart = (res) => {
  // options
  let options = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  };
  if (res.cros) options = Object.assign({}, res.cros, options);

  // go
  res.response.writeHeader(200, options);
};

/**
 * streamingEnd
 * @param {*} res
 */
export const streamingEnd = (res) => {
  res.response.end();
};

/**
 * streaming
 * @param {*} res
 */
/**
 * streaming
 * @param {*} res
 * @param {*} msg
 */
export const streaming = (res, msg) => {
  res.response.write(msg);
};
