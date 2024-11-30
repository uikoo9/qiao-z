// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-cos');

// controller
const cosController = require('./src/controller/CosController.js');

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
  cosController(app);
};
