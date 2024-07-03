// http
import http from 'http';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');

/**
 * res.proxy
 * @param {*} request
 * @param {*} response
 * @param {*} proxyOptions
 */
const proxy = (request, response, proxyOptions) => {
  const methodName = 'res.proxy';

  // check
  if (!proxyOptions) {
    logger.error(methodName, 'need proxyOptions');
    responseError(response);
    return;
  }
  if (!proxyOptions.host) {
    logger.error(methodName, 'need proxyOptions.host');
    responseError(response);
    return;
  }
  if (!proxyOptions.port) {
    logger.error(methodName, 'need proxyOptions.port');
    responseError(response);
    return;
  }
  if (!proxyOptions.path) {
    logger.error(methodName, 'need proxyOptions.path');
    responseError(response);
    return;
  }

  // options
  const options = {
    hostname: proxyOptions.host,
    port: proxyOptions.port,
    path: proxyOptions.path,
    method: request.method,
    headers: request.headers,
  };
  logger.info(methodName, 'options', options);

  // proxy
  const proxy = http.request(options, (proxyRes) => {
    logger.info(methodName, 'proxyRes.statusCode', proxyRes.statusCode);
    logger.info(methodName, 'proxyRes.headers', proxyRes.headers);

    response.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(response, { end: true });
  });
  proxy.on('error', (err) => {
    logger.error(methodName, 'proxy request error', err);
    responseError(response);
  });

  // request
  request.pipe(proxy, { end: true });
};

// response error
function responseError(response) {
  response.writeHead(500, { 'Content-Type': 'text/plain' });
  response.end('Something went wrong.');
}

export default proxy;
