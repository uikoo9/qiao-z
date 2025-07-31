/**
 * streamingStart
 * @param {*} res
 */
export const streamingStart = (res) => {
  res.response.writeHeader(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
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
