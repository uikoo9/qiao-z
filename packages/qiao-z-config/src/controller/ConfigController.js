// service
const service = require('../service/ConfigService.js');

/**
 * config controller
 */
module.exports = (app) => {
  // /config
  app.post('/config', (req, res) => {
    service.configFn(req, res);
  });
};
