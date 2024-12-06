// service
const service = require('../service/AppService.js');

/**
 * app controller
 */
module.exports = (app) => {
  // /app
  app.post('/app/update', (req, res) => {
    service.appUpdateFn(req, res);
  });
};
