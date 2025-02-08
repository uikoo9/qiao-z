// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-config');

// controller
const configController = require('./src/controller/ConfigController.js');

/**
 * init
 * @param {*} app qz app
 */
exports.init = function (app) {
  // check app
  if (!app) {
    logger.info('init', 'need app');
    return;
  }

  // init controller
  configController(app);
};
