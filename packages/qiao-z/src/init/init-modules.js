// logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');
const methodName = 'initModules';

/**
 * init modules
 * @param {*} app
 * @param {*} options
 * @returns
 */
const initModules = (app, options) => {
  if (!app || !options || !options.modules || !options.config) return;

  // modules
  options.modules.forEach((m) => {
    m(app, options.config);
  });
  logger.info(methodName, 'end');
};

export default initModules;
