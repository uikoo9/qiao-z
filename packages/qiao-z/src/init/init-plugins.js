// rate limit
import { rateLimitCheck } from './rate-limit.js';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
const methodName = 'initPlugins';

// cros options
const crosOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
};

/**
 * init plugins
 * @param {*} options
 * @returns
 */
export default (options) => {
  // plugins
  const plugins = {};

  // rateLimit
  if (options && options.rateLimitLib && options.rateLimitOptions) {
    debug(methodName, 'options.rateLimitOptions');

    // init
    global.rateLimitItems = [];
    const rateLimitLib = options.rateLimitLib;
    const rateLimitInterval = options.rateLimitOptions.interval;
    const rateLimitDuration = options.rateLimitOptions.duration;
    const rateLimitMaxCount = options.rateLimitOptions.maxCount;
    const { clearIntervalRateLimit, rateLimit } = rateLimitLib;

    // clear
    clearIntervalRateLimit(rateLimitDuration, rateLimitInterval);

    // checks
    options.checks = options.checks || [];
    options.checks.push((req, res) => {
      return rateLimitCheck(req, res, rateLimit, rateLimitMaxCount);
    });
  }

  // checks
  if (options && options.checks) {
    debug(methodName, 'options.checks');
    plugins.checks = options.checks;
  }

  // cros
  if (options && options.cros) {
    debug(methodName, 'options.cros');
    plugins.cros = options.cros === true ? crosOptions : options.cros;
  }

  // logger
  if (options && options.log && options.logOptions) {
    debug(methodName, 'options.log');
    plugins.logger = options.log(options.logOptions);
  }

  // sentry
  if (options && options.sentry) {
    debug(methodName, 'options.sentry');
    plugins.sentry = options.sentry();
  }

  // mysql
  if (options && options.mysql && options.config && options.config.db) {
    debug(methodName, 'options.db');
    plugins.db = options.mysql(options.config.db);
  }

  // redis
  if (options && options.redis) {
    debug(methodName, 'options.redis');
    plugins.redis = options.redis(options.redisOptions);
  }

  // upload
  if (options && options.upload) {
    debug(methodName, 'options.upload');
    plugins.upload = options.upload;
  }

  return plugins;
};
