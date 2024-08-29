// http
import http from 'http';

// zlib
import zlib from 'zlib';

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
 * @param {*} proxyCallback
 * @returns
 */
const proxy = (request, response, proxyOptions, proxyCallback) => {
  const methodName = 'res.proxy';

  // check
  if (!proxyOptions) {
    logger.error(methodName, 'need proxyOptions');
    responseError(response, proxyCallback);
    return;
  }
  if (!proxyOptions.host) {
    logger.error(methodName, 'need proxyOptions.host');
    responseError(response, proxyCallback);
    return;
  }
  if (!proxyOptions.port) {
    logger.error(methodName, 'need proxyOptions.port');
    responseError(response, proxyCallback);
    return;
  }
  if (!proxyOptions.path) {
    logger.error(methodName, 'need proxyOptions.path');
    responseError(response, proxyCallback);
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
  const proxyRequest = http.request(options, (proxyRes) => {
    logger.info(methodName, 'proxyRes.statusCode', proxyRes.statusCode);
    logger.info(methodName, 'proxyRes.headers', proxyRes.headers);

    // callback
    if (proxyCallback) responseData(proxyRes, proxyCallback);

    // cookies
    responseSetCookie(response, proxyOptions);
    responseClearCookie(response, proxyOptions);

    // res
    response.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(response, { end: true });
  });
  proxyRequest.on('error', (err) => {
    logger.error(methodName, 'proxy request error', err);
    responseError(response, proxyCallback);
  });

  // proxy req
  if (request.method === 'POST') {
    const postData = JSON.stringify(proxyOptions.body);
    logger.info(methodName, 'postData', postData);
    proxyRequest.write(postData);
    proxyRequest.end();
  } else {
    request.pipe(proxyRequest, { end: true });
  }
};

// response error
function responseError(response, proxyCallback) {
  const error = 'proxy server error';
  if (proxyCallback) proxyCallback(error);

  response.writeHead(500, { 'Content-Type': 'application/json' });
  response.end({ error });
}

// response set cookie
function responseSetCookie(response, proxyOptions) {
  // check
  if (!proxyOptions || !proxyOptions.cookies) return;

  // set
  let setCookieHeaders = [];
  for (let i = 0; i < proxyOptions.cookies.length; i++) {
    const item = proxyOptions.cookies[i];
    setCookieHeaders.push(
      cookie.serialize(item.key, String(item.value), {
        secure: true,
        sameSite: 'none',
        maxAge: item.maxAge || 60 * 60 * 24 * 7, // 1 week
        path: item.path || '/',
      }),
    );
  }
  response.setHeader('Set-Cookie', setCookieHeaders);
}

// response clear cookie
function responseClearCookie(response, proxyOptions) {
  // check
  if (!proxyOptions || !proxyOptions.clearCookies) return;

  // clear
  let setCookieHeaders = [];
  for (let i = 0; i < proxyOptions.clearCookies.length; i++) {
    const item = proxyOptions.clearCookies[i];
    setCookieHeaders.push(
      cookie.serialize(item.key, '', { secure: true, sameSite: 'none', expires: new Date(1), path: '/' }),
    );
  }
  response.setHeader('Set-Cookie', setCookieHeaders);
}

// response data
function responseData(proxyRes, proxyCallback) {
  let data = '';

  // gzip
  if (proxyRes.headers['content-encoding'] === 'gzip') {
    const gzip = zlib.createGunzip();
    proxyRes.pipe(gzip);

    gzip.on('data', (chunk) => {
      data += chunk;
    });
    gzip.on('end', () => {
      proxyCallback(null, data, proxyRes);
    });
  } else {
    proxyRes.on('data', (chunk) => {
      data += chunk;
    });
    proxyRes.on('end', () => {
      proxyCallback(null, data, proxyRes);
    });
  }
}

export default proxy;
