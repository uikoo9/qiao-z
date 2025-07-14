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
 * @param {*} plugins
 * @returns
 */
const handleRequest = async (request, plugins) => {
  const req = {};
  req.request = request;
  req.url = parseurl(request);
  req.headers = handleHeaders(request);
  req.cookies = handleCookies(req);
  req.useragent = handleUseragent(req);
  req.query = handleQuery(req);
  req.body = await handleBody(req, plugins);

  // ip
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
  if (ip) req.ip = ip;

  // logger
  if (plugins && plugins.logger) {
    req.logger = plugins.logger;
  }

  // sentry
  if (plugins && plugins.sentry) {
    req.sentry = plugins.sentry;
  }

  // mysql
  if (plugins && plugins.db) {
    req.db = plugins.db;
  }

  // redis
  if (plugins && plugins.redis) {
    req.redis = plugins.redis;
  }

  return req;
};

export default handleRequest;
