// parseurl
import parseurl from 'parseurl';

// headers
import handleHeaders from './req-headers.js';

// cookies
import handleCookies from './req-cookies.js';

// useragent
import handleUseragent from './req-useragent.js';

// query
import handleQuery from './req-query.js';

// body
import handleBody from './req-body.js';

/**
 * req
 * @param {*} request
 * @param {*} options
 * @returns
 */
const handleRequest = async (request, options) => {
  const req = {};
  req.request = request;
  req.url = parseurl(request);
  req.headers = handleHeaders(request);
  req.cookies = handleCookies(req);
  req.useragent = handleUseragent(req);
  req.query = handleQuery(req);
  req.body = await handleBody(req, options);

  // ip
  const ip = req.headers['x-real-ip'];
  if (ip) req.ip = ip;

  // logger
  if (options && options.log && options.logOptions) {
    req.logger = options.log(options.logOptions);
  }

  // mysql
  if (options && options.mysql && options.config && options.config.db) {
    req.db = options.mysql(options.config.db);
  }

  return req;
};

export default handleRequest;
