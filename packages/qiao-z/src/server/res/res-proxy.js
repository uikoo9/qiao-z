// http
import http from 'http';

// cookie
import cookie from 'cookie';

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

    // cookies
    responseSetCookie(response, proxyOptions);
    responseClearCookie(response, proxyOptions);

    // res
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

// response set cookie
function responseSetCookie(response, proxyOptions) {
  // check
  if (!proxyOptions || !proxyOptions.cookies) return;

  // set
  for (let i = 0; i < proxyOptions.cookies.length; i++) {
    const item = proxyOptions.cookies[i];
    response.setHeader(
      'Set-Cookie',
      cookie.serialize(item.key, String(item.value), {
        maxAge: item.maxAge || 60 * 60 * 24 * 7, // 1 week
        path: item.path || '/',
      }),
    );
  }
}

// response clear cookie
function responseClearCookie(response, proxyOptions) {
  // check
  if (!proxyOptions || !proxyOptions.clearCookies) return;

  // clear
  for (let i = 0; i < proxyOptions.clearCookies.length; i++) {
    const item = proxyOptions.clearCookies[i];
    response.setHeader('Set-Cookie', cookie.serialize(item.key, '', { expires: new Date(1), path: '/' }));
  }
}

export default proxy;
