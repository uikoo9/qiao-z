// logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');
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

  // checks
  if (options && options.checks) {
    logger.info(methodName, 'options.checks');
    plugins.checks = options.checks;
  }

  // cros
  if (options && options.cros) {
    logger.info(methodName, 'options.cros');
    plugins.cros = options.cros === true ? crosOptions : options.cros;
  }

  // logger
  if (options && options.log && options.logOptions) {
    logger.info(methodName, 'options.log');
    plugins.logger = options.log(options.logOptions);
  }

  // mysql
  if (options && options.mysql && options.config && options.config.db) {
    logger.info(methodName, 'options.db');
    plugins.db = options.mysql(options.config.db);
  }

  // upload
  if (options && options.upload) {
    logger.info(methodName, 'options.upload');
    plugins.upload = options.upload;
  }

  return plugins;
};
