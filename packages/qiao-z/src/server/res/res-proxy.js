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
  // options
  const options = {
    hostname: proxyOptions.host,
    port: proxyOptions.port,
    path: request.url,
    method: request.method,
    headers: request.headers,
  };

  // proxy
  const proxy = http.request(options, (proxyRes) => {
    response.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(response, { end: true });
  });
  proxy.on('error', (err) => {
    logger.error('Proxy request error:', err);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Something went wrong.');
  });

  // request
  request.pipe(proxy, { end: true });
};

export default proxy;
